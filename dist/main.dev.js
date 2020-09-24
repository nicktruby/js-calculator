"use strict";

//---- GET HTML BUTTONS ----////
var numberButtons = document.querySelectorAll('.number');
var operatorButtons = document.querySelectorAll('.operator');
var clearButton = document.querySelector('#clear');
var decimalButton = document.querySelector('#decimal');
var reverseButton = document.querySelector('#reverse');
var percentButton = document.querySelector('#percent');
var equalsButton = document.querySelector('#equals');
var display = document.querySelector('#display'); //---- REUSABLE FUNCTIONS ----////

var checkCurrentLength = function checkCurrentLength() {
  return currentNumber.length < 9;
};

var checkInputEmpty = function checkInputEmpty() {
  return currentNumber === "";
};

var checkMemory = function checkMemory() {
  return display.innerHTML === memoryNumber;
};

var updateDisplay = function updateDisplay(number) {
  return display.innerHTML = number;
};

var updateClearButton = function updateClearButton() {
  return currentNumber === "" ? clearButton.innerHTML = "AC" : clearButton.innerHTML = "C";
};

var clearAll = function clearAll() {
  currentNumber = "";
  memoryOperator = "";
  memoryNumber = "";
}; //---- VARIABLES ----////


var currentNumber = "";
var memoryNumber = 0;
var memoryOperator = "";
var calculatedNumber = 0; //---- NUMBER BUTTON CLICKED ----////

numberButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    if (checkCurrentLength()) {
      checkInputEmpty() ? currentNumber = event.target.innerHTML : currentNumber += event.target.innerHTML;
      updateDisplay(currentNumber);
      updateClearButton();
    }
  });
}); //---- OPERATOR BUTTON CLICKED ----//

operatorButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    memoryNumber = parseFloat(currentNumber);
    memoryOperator = event.target.value;
    currentNumber = "";
  });
}); //---- EQUALS BUTTON CLICKED ----//

equalsButton.addEventListener('click', function () {
  switch (memoryOperator) {
    case "plus":
      calculatedNumber = memoryNumber + parseFloat(currentNumber);
      break;

    case "minus":
      calculatedNumber = memoryNumber - parseFloat(currentNumber);
      break;

    case "times":
      calculatedNumber = memoryNumber * parseFloat(currentNumber);
      break;

    case "divide":
      calculatedNumber = memoryNumber / parseFloat(currentNumber);
      break;
  }

  ;
  memoryNumber = calculatedNumber;
  updateDisplay(calculatedNumber);
}); //---- DECIMAL BUTTON CLICKED ----//

decimalButton.addEventListener('click', function (event) {
  currentNumber.includes(".") ? '' : currentNumber += ".";
  updateDisplay(currentNumber);
}); //---- CLEAR BUTTON CLICKED ----//

clearButton.addEventListener('click', function () {
  if (memoryOperator !== "" && currentNumber === "") {
    currentNumber = memoryNumber;
    memoryOperator = "";
  } else {
    clearButton.innerHTML = "C" ? currentNumber = "" : clearAll();
    updateDisplay("0");
    updateClearButton();
  }
}); //---- REVERSAL BUTTON CLICKED ----//

reverseButton.addEventListener('click', function () {
  currentNumber.includes("-") ? currentNumber = currentNumber.replace("-", "") : currentNumber = "-" + currentNumber;
  updateDisplay(currentNumber);
}); //---- PERCENT BUTTON CLICKED ----//

percentButton.addEventListener('click', function () {
  if (checkCurrentLength()) {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay(currentNumber);
  }
});