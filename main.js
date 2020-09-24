//---- GET HTML BUTTONS ----////
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const decimalButton = document.querySelector('#decimal');
const reverseButton = document.querySelector('#reverse');
const percentButton = document.querySelector('#percent');
const equalsButton = document.querySelector('#equals');
const display = document.querySelector('#display');

//---- REUSABLE FUNCTIONS ----////
const checkCurrentLength = () => currentNumber.length < 9;
const checkInputEmpty = () => currentNumber === "";
const checkMemory = () => display.innerHTML === memoryNumber;
const updateDisplay = (number) => display.innerHTML = number;
const updateClearButton = () => currentNumber === "" ? clearButton.innerHTML = "AC" : clearButton.innerHTML = "C";
const clearAll = () => {
  currentNumber = "";
  memoryOperator = "";
  memoryNumber = "";
}

//---- VARIABLES ----////
let currentNumber = "";
let memoryNumber = 0;
let memoryOperator = "";
let calculatedNumber = 0;

//---- NUMBER BUTTON CLICKED ----////
  numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (checkCurrentLength()) {
        // check if the current number is a 0, seeing if the current input is a 0. 
        checkInputEmpty() ? currentNumber = event.target.innerHTML : currentNumber += event.target.innerHTML;
        updateDisplay(currentNumber);
        updateClearButton();
      }
    });
  });

//---- OPERATOR BUTTON CLICKED ----//
operatorButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    memoryNumber = parseFloat(currentNumber);
    memoryOperator = event.target.value;
    currentNumber = "";
  });
});

//---- EQUALS BUTTON CLICKED ----//
equalsButton.addEventListener('click', () => {
  currentNumber === "" ? currentNumber = memoryNumber : "";
  switch (memoryOperator) {
    case "plus" :
      calculatedNumber = memoryNumber + parseFloat(currentNumber);
      break
    case "minus" : 
      calculatedNumber = memoryNumber - parseFloat(currentNumber);
      break
    case "times" : 
      calculatedNumber = memoryNumber * parseFloat(currentNumber);
      break
    case "divide" :
      calculatedNumber = memoryNumber / parseFloat(currentNumber);
      break
  };
  memoryNumber = calculatedNumber;
  updateDisplay(calculatedNumber);
});

//---- DECIMAL BUTTON CLICKED ----//
decimalButton.addEventListener('click', () => {
  currentNumber.includes(".") ? '' : currentNumber += ".";
  updateDisplay(currentNumber);
});

//---- CLEAR BUTTON CLICKED ----//
clearButton.addEventListener('click', () => {
  if (memoryOperator !== "" && currentNumber === "") {
    currentNumber = memoryNumber;
    memoryOperator = "";
  } else {
  clearButton.innerHTML = "C" ? currentNumber = "" : clearAll();
  updateDisplay("0");
  updateClearButton();
  }
});

//---- REVERSAL BUTTON CLICKED ----//
reverseButton.addEventListener('click', () => {
  currentNumber = display.innerHTML;
  currentNumber.includes("-") ? currentNumber = currentNumber.replace("-", "") : currentNumber = "-" + currentNumber;
  updateDisplay(currentNumber);
});

//---- PERCENT BUTTON CLICKED ----//
percentButton.addEventListener('click', () => {
  if (checkCurrentLength()) {
    currentNumber = (parseFloat(currentNumber)/100).toString();
    updateDisplay(currentNumber);
  }
});