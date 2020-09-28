//---- GET HTML BUTTONS ----////
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const decimalButton = document.querySelector('#decimal');
const reverseButton = document.querySelector('#reverse');
const percentButton = document.querySelector('#percent');
const equalsButton = document.querySelector('#equals');
const display = document.querySelector('#display');

//---- VARIABLES ----////
let currentNumber = "";
let memoryNumber = 0;
let memoryOperator = "";
let calculatedNumber = 0;
let previousCurrentNumber = "";

//---- REUSABLE FUNCTIONS ----////
const checkCurrentLength = () => currentNumber.length < 27;
const checkInputEmpty = () => currentNumber === "";
const checkMemory = () => display.innerHTML === memoryNumber;
const updateDisplay = (number) => display.innerHTML = number;
const updateClearButton = (clearMessage) => clearButton.innerHTML = clearMessage;
const clearAll = () => {
  updateDisplay("0");
  currentNumber = "";
  previousCurrentNumber = "";
  memoryOperator = "";
  memoryNumber = 0;
  calculatedNumber = 0;}

const executeCalculation = (memNum, operator, curNum) => {
  operatorButtons.forEach((button) => {
    button.classList.remove('active-operator');
  });
  if (curNum === "") {
    previousCurrentNumber === "" ? curNum = 0 : curNum = previousCurrentNumber;;
  } 
  switch (operator) {
    case "plus" : calculatedNumber = memNum + parseFloat(curNum);
      break
    case "minus" : calculatedNumber = memNum - parseFloat(curNum);
      break
    case "times" : calculatedNumber = memNum * parseFloat(curNum);
      break
    case "divide" : calculatedNumber = memNum / parseFloat(curNum);
      break
  };
  updateDisplay(calculatedNumber);
  memoryNumber = calculatedNumber;
  curNum === 0 ? previousCurrentNumber = memNum : previousCurrentNumber = curNum;
  currentNumber = "";
}

//---- NUMBER BUTTON CLICKED ----////
  numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (checkCurrentLength()) {
        // check if the current number is a 0, seeing if the current input is a 0. 
        checkInputEmpty() ? currentNumber = event.target.innerHTML : currentNumber += event.target.innerHTML;
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
    if (!currentNumber) {
      button.classList.add('active-operator');
      memoryOperator = event.target.value;
    } else {    
    memoryNumber = parseFloat(currentNumber);
    memoryOperator = event.target.value;
    button.classList.add('active-operator');
    currentNumber = "";
    }
  });
});

//---- EQUALS BUTTON CLICKED ----//
equalsButton.addEventListener('click', () => {
  executeCalculation(memoryNumber, memoryOperator, currentNumber);
});

//---- DECIMAL BUTTON CLICKED ----//
decimalButton.addEventListener('click', () => {
  currentNumber.includes(".") ? '' : currentNumber += ".";
  updateDisplay(currentNumber);
});

//---- CLEAR BUTTON CLICKED ----//
clearButton.addEventListener('click', () => {
  if (clearButton.innerHTML === "AC") {
    clearAll();
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