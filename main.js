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
const checkCurrentLength = (maxlength) => currentNumber.length < maxlength;
const updateDisplay = (number) => display.innerHTML = number;
const updateClearButton = (clearMessage) => clearButton.innerHTML = clearMessage;
  
//---- NUMBER BUTTON CLICKED ----////
// 1) Checks if the length has room for another number to be added, if so, contineue.
// 2) Checks if there is no current input (displaying a 0), if so starts a new number, if not adds to the current number.
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
// 1) Remove the active class from any operator buttons.
// 2) Adds the active class to the selected operator button.
// 3) If the inputted current number is present, move it to the memory number and clear the current input.
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
// 1) Runs through each operator button and removes the active class.
// 2) If it not the first calcualtion made, and only the first half input is made, using the same number in the second half, if not uses the number from previous calculation.
// 3) Runs the relevant calculation depending on which operator has been selected. 
// 4) Sets the previousCalcualtedNumber so that if equals is repeatably pressed it still works.
equalsButton.addEventListener('click', () => {
  operatorButtons.forEach((button) => {
    button.classList.remove('active-operator');
  });
  if (currentNumber === "") {
    previousCurrentNumber === "" ? currentNumber = memoryNumber : currentNumber = previousCurrentNumber;;
  } 
  switch (memoryOperator) {
    case "plus" : calculatedNumber = memoryNumber + parseFloat(currentNumber);
      break
    case "minus" : calculatedNumber = memoryNumber - parseFloat(currentNumber);
      break
    case "times" : calculatedNumber = memoryNumber * parseFloat(currentNumber);
      break
    case "divide" : calculatedNumber = memoryNumber / parseFloat(currentNumber);
      break
  };
  updateDisplay(calculatedNumber);
  memoryNumber = calculatedNumber;
  previousCurrentNumber = currentNumber;
  currentNumber = "";
});

//---- DECIMAL BUTTON CLICKED ----//
// 1) Checks if the length has room for decimal and a following number to be added if so, continues.
// 2) If current input number already includes a decimal, ignore input.
// 3) If not, then allow the input of the decimal point.
decimalButton.addEventListener('click', () => {
  if (checkCurrentLength(26)) {
    currentNumber.includes(".") ? '' : currentNumber += ".";
    updateDisplay(currentNumber);
  }
});

//---- REVERSAL BUTTON CLICKED ----//
// 1) Check if the current number being input is already set as negative, if so removes the negative.
// 2) Checks if the length has room for the - sign to added, if so, adds it.
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
// 1) Converts the currently input number from a whole percentage, into a decimal equivilant. 
percentButton.addEventListener('click', () => {
  currentNumber = (parseFloat(currentNumber)/100).toString();
  updateDisplay(currentNumber);
});

//---- CLEAR BUTTON CLICKED ----//
// 1) Checks if the button is set to AC, if so, clears all varibles.
// 2) Checks if the a number is currently being entered, if so, clears it, changes button to AC.
// 3) Checks if the operator is being input, if so, clear it, changes button to AC.
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