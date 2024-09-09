const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operation = null;

// Event listener for button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const action = button.getAttribute('data-action');

        if (value) {
            handleNumber(value);
        } else if (action) {
            handleAction(action);
        }
    });
});

// Handles numerical inputs
function handleNumber(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

// Handles action buttons (clear, equals, operations)
function handleAction(action) {
    if (action === 'clear') {
        clearCalculator();
    } else if (action === 'equals') {
        calculateResult();
    } else {
        setOperation(action);
    }
    updateDisplay();
}

// Clears the calculator display and reset states
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
}

// Sets the current operation
function setOperation(action) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculateResult();
        }
        previousInput = currentInput;
        currentInput = '';
    }
    operation = action;
}

// Performs the calculation based on the operation
function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case 'add':
            result = prev + curr;
            break;
        case 'subtract':
            result = prev - curr;
            break;
        case 'multiply':
            result = prev * curr;
            break;
        case 'divide':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
}

// Updates the calculator display
function updateDisplay() {
    display.value = currentInput || '0';
}
