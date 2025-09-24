const resultInput = document.getElementById('result');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldReset = false;

function updateDisplay() {
  resultInput.value = currentInput;
}

function clearAll() {
  currentInput = '0';
  operator = null;
  previousInput = null;
  shouldReset = false;
  updateDisplay();
}

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
}

buttons.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;
  const value = e.target.dataset.value;


  if (!isNaN(value) || value === '.') {
    if (shouldReset) {
      currentInput = '';
      shouldReset = false;
    }
    if (value === '.' && currentInput.includes('.')) return;
    currentInput = currentInput === '0' && value !== '.' ? value : currentInput + value;
    updateDisplay();
  }


  if (e.target.classList.contains('operator')) {
    if (operator && !shouldReset) {
      currentInput = calculate(previousInput, currentInput, operator).toString();
      updateDisplay();
    }
    previousInput = currentInput;
    operator = value;
    shouldReset = true;
  }


  if (e.target.classList.contains('equals')) {
    if (!operator || shouldReset) return;
    currentInput = calculate(previousInput, currentInput, operator).toString();
    updateDisplay();
    operator = null;
  }

  if (e.target.classList.contains('clear')) {
    clearAll();
  }
});


updateDisplay();
