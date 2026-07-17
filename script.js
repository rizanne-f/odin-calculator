let number1;
let operator;
let numnber2;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num2 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            sum(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            subtract(num1, num2);
            break;
        case '/':
            divide(num1, num2);
            break;
    }
}