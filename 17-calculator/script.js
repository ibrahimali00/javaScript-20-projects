const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');

// Calculate first and second number depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // replacing current display if first value is enterned
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if current display value == 0 , replace it , else add number
    const displayValue = calculatorDisplay.textContent;

    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

// Add DECIMAL
function addDecimal() {
  if (awaitingNextValue) return;
  // If no decimal add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent += '.';
  } else {
    return;
  }
}

function useOpertor(opertor) {
  const currentValue = Number(calculatorDisplay.textContent);

  // Prevent Multplie Operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = opertor;
    return;
  }

  // Assign first value if there is no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculatation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculatation;
    firstValue = calculatation;
  }
  // Ready for next value
  awaitingNextValue = true;
  operatorValue = opertor;
}

// Reset all values , Display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Add Event Listner for numbers , operators and decimal
inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener('click', () => sendNumberValue(btn.value));
  } else if (btn.classList.contains('operator')) {
    btn.addEventListener('click', () => useOpertor(btn.value));
  } else if (btn.classList.contains('decimal')) {
    btn.addEventListener('click', () => addDecimal());
  }
});

clearBtn.addEventListener('click', resetAll);
