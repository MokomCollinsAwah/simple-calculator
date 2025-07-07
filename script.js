// Get the result input element
const result = document.getElementById('result');

// Function to append characters to the result
function appendToResult(value) {
    // If the current value is '0', replace it with the new value
    // unless the new value is a decimal point
    if (result.value === '0' && value !== '.') {
        result.value = value;
    } else {
        result.value += value;
    }
}

// Function to clear the result
function clearResult() {
    result.value = '';
}

// Function to delete the last character
function deleteLastChar() {
    result.value = result.value.slice(0, -1);
}

// Function to calculate the result
function calculate() {
    try {
        // Replace '×' with '*' for JavaScript evaluation
        let expression = result.value.replace(/×/g, '*');
        
        // Check if the expression is empty
        if (expression === '') {
            return;
        }
        
        // Evaluate the expression and update the result
        result.value = eval(expression);
        
        // If the result is not a finite number, clear it
        if (!isFinite(result.value)) {
            result.value = 'Error';
            setTimeout(clearResult, 1500);
        }
    } catch (error) {
        // If there's an error in evaluation, show 'Error'
        result.value = 'Error';
        setTimeout(clearResult, 1500);
    }
}

// Initialize the calculator with '0'
window.onload = function() {
    result.value = '0';
};

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if (/^[0-9+\-*/.=]$/.test(key)) {
        if (key === '=') {
            calculate();
        } else if (key === '*') {
            appendToResult('×');
        } else {
            appendToResult(key);
        }
    }
    
    // Enter key for calculation
    else if (key === 'Enter') {
        calculate();
    }
    
    // Backspace for delete
    else if (key === 'Backspace') {
        deleteLastChar();
    }
    
    // Escape for clear
    else if (key === 'Escape') {
        clearResult();
    }
});
