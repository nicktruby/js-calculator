//---- GET HTML BUTTONS ----////
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const reverseButton = document.querySelector('.reverse');
const percentButton = document.querySelector('.percent');
const equalsButton = document.querySelector('.equals');
const display = document.querySelector('.display');

//---- VARIABLES ----////
let currentNumber = "";
let memoryNumber = 0;
let memoryOperator = "";
let calculatedNumber = 0;
let previousCurrentNumber = "";

//---- REUSABLE FUNCTIONS ----////
const checkCurrentLength = (maxlength) => currentNumber.length < maxlength;
const updateDisplay = (number) => display.innerHTML = number;
const updateClearButton = (clearMessage) => clearButton.innerHTML = clearMessage;
  
//---- NUMBER BUTTON CLICKED ----////
numberButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (checkCurrentLength(27)) {
      (!currentNumber) ? currentNumber = event.target.innerHTML : currentNumber += event.target.innerHTML;
      updateDisplay(currentNumber);
      updateClearButton("C");
    }
  });
});

//---- OPERATOR BUTTON CLICKED ----//
operatorButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    operatorButtons.forEach((button) => {
      button.classList.remove('active-operator');
    });
    button.classList.add('active-operator');
    memoryOperator = event.target.value;
    updateClearButton("C")
    if (currentNumber) {
    memoryNumber = parseFloat(currentNumber);
    currentNumber = ""
    }
  });
});

//---- EQUALS BUTTON CLICKED ----//
equalsButton.addEventListener('click', () => {
  operatorButtons.forEach((button) => {
    button.classList.remove('active-operator');
  });
  if (!currentNumber) previousCurrentNumber === "" ? currentNumber = memoryNumber : currentNumber = previousCurrentNumber; 
  switch (memoryOperator) {
    case "plus" : calculatedNumber = memoryNumber + parseFloat(currentNumber); break;
    case "minus" : calculatedNumber = memoryNumber - parseFloat(currentNumber); break;
    case "times" : calculatedNumber = memoryNumber * parseFloat(currentNumber); break;
    case "divide" : calculatedNumber = memoryNumber / parseFloat(currentNumber); break;
  };
  updateDisplay(calculatedNumber);
  memoryNumber = calculatedNumber;
  previousCurrentNumber = currentNumber;
  currentNumber = "";
});

//---- DECIMAL BUTTON CLICKED ----//
decimalButton.addEventListener('click', () => {
  if (checkCurrentLength(26)) {
    !currentNumber ? currentNumber = "0." : currentNumber.includes(".") ? '' : currentNumber += ".";
    updateDisplay(currentNumber);
  }
});

//---- REVERSAL BUTTON CLICKED ----//
reverseButton.addEventListener('click', () => {
  currentNumber = display.innerHTML;
  if (currentNumber.includes("-")) {
    currentNumber = currentNumber.replace("-", "")
  } else if (checkCurrentLength(27)) {
    currentNumber = "-" + currentNumber;
  }
  updateDisplay(currentNumber);
});

//---- PERCENT BUTTON CLICKED ----//
percentButton.addEventListener('click', () => {
  currentNumber = (parseFloat(currentNumber)/100).toString();
  updateDisplay(currentNumber);
});

//---- CLEAR BUTTON CLICKED ----//
clearButton.addEventListener('click', () => {
  if (clearButton.innerHTML === "AC") {
    updateDisplay("0");
    currentNumber = "";
    previousCurrentNumber = "";
    memoryOperator = "";
    memoryNumber = 0;
    calculatedNumber = 0;
  } else if (currentNumber) {
    currentNumber = "";
    updateDisplay("0");
    updateClearButton("AC");
  } else if (memoryOperator) {
    operatorButtons.forEach((button) => {
      button.classList.remove('active-operator');
    });
    memoryOperator = "";
    updateClearButton("AC");
  }
});