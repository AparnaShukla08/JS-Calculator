class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {                       //Clear function clears the current operand as well as previous operand and sets opeartion to undefined.
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {                //Delete function selects the current operand and convert it into string and slice the immediate last value
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {          //The append function appends the number that needs to be calculated.First all the number are converted to string so that numbers are not added,but concatenated like string.
      if (number === '.' && this.currentOperand.includes('.')) return     //When we append,the decimal point is appended many times but that is not ideal for computation, so we put a check,if the current operand already contains a decimal points,then it will simply return.
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {      //In the choose operation,if the current operand is empty,simply return,if the previous operand is not null,then perform computation.
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation     ///Operation is set to the chosen operation, previous operand is set to current operand and current operand is empty.
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation   //Creating a variable to store all the computation
      const prev = parseFloat(this.previousOperand)     //Creating variable to store the value of previous operand
      const current = parseFloat(this.currentOperand)   //Creating variable to store the value of current operand
      if (isNaN(prev) || isNaN(current)) return       //check if the current or previous number is not a number,if yes,then return 
      switch (this.operation) {                   //Switch loop that takes all the operation and perform desired computation
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '/':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation      ///Current value will become the result of the computation
      this.operation = undefined            //Operation is set to undefined
      this.previousOperand = ''         //Previous operand is set to empty string
    }
  
    getDisplayNumber(number) {            //This function displays the number entered in the calculator
      const stringNumber = number.toString()          //The number is converted to string
      const integerDigits = parseFloat(stringNumber.split('.')[0])    
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {     
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]') //Creating variable to store and return all the number buttons
  const operationButtons = document.querySelectorAll('[data-operation]')   //Creating variable to store and return all the opeartions buttons
  const equalsButton = document.querySelector('[data-equals]')            //Creating variable to return the equal button
  const deleteButton = document.querySelector('[data-delete]')            //Creating variable to return the delete button
  const allClearButton = document.querySelector('[data-all-clear]')       //Creating variable to return the all-clear button
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')  //Creating variable to return the previous operand
  const currentOperandTextElement = document.querySelector('[data-current-operand]')    //Creating variable to return the cureent operand
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)//creating object of the main class
  
  numberButtons.forEach(button => {                 //for each number button,when clicked,it should be appended in tha calculator and updated on the screen
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {        //for each operation button,when clicked,chooseoperation is triggered and the result is updated.
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {      //When equals button is clicked,compute function is triggered and result is updated.
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {    //When all clear button is clicked,clear function is triggered, and the result is updated.
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {    //When delete button is clicked,delete function is trigered,and the result is updated.
    calculator.delete()
    calculator.updateDisplay()
  })