let num1 = null;
let num2 = null;
let operator = null;
let awaitingNewNum = true;
let newOperation = false;

const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const equals = document.getElementById("equals");
const btnClear = document.getElementById("clear")
const btnRemove = document.getElementById("remove-last")
const dialog = document.getElementById("dialog")

operators.forEach(op => {
    op.addEventListener("click", (e) => {
        handleOperationsClick(e.target.id);
    })
})

numbers.forEach(number => {
    number.addEventListener("click", e => {
        handleNumbersClick(e.target.id);
    })
})

equals.addEventListener("click", () => handleEqualsClick())
btnClear.addEventListener("click", () => handleClear())
btnRemove.addEventListener("click", () => handleRemove())

window.addEventListener("keydown", (e) => {
    const numbers = "1234567890.";
    const operators = "*-+/";

    if (numbers.includes(e.key)) return handleNumbersClick(e.key);
    if (operators.includes(e.key)) return handleOperationsClick(e.key);
    if (e.key === "=" || e.key === "Enter") return handleEqualsClick();
    if (e.key === "Backspace") return handleRemove();
    if (e.key === "Escape") return handleClear();
})

function adjustScrollLocation() {
    display.scrollLeft = display.scrollWidth - display.clientWidth;
}
adjustScrollLocation()

function handleOperationsClick(op) {
    const displayContent = display.textContent;
    const operatorClicked = op;
    adjustScrollLocation();

    if (displayContent === "0" && num1 === null) {
        if (operatorClicked !== "-") {
            num1 = 0;
            operator = operatorClicked;
            return awaitingNewNum = true;
        }
        display.textContent = operatorClicked;
    }

    if (!awaitingNewNum && num1 === null || newOperation) {
        num1 = Number(displayContent);
        operator = operatorClicked;
        awaitingNewNum = true;
        return newOperation = false;
    }
    
    if (!awaitingNewNum && num2 === null) {
        num2 = Number(displayContent);
        num1 = Math.round(operate(operator, num1, num2) * 100) / 100;
        operator = operatorClicked;
        display.textContent = num1;
        
        num2 = null;
        return awaitingNewNum = true;
    }

    awaitingNewNum = true;
}

function handleNumbersClick(num) {
    const displayContent = display.textContent;
    const number = num;
    adjustScrollLocation();

    if (!awaitingNewNum && displayContent.includes(".") && number === ".") return;

    if (displayContent === "0" && number !== ".") {
        display.textContent = number;
        return awaitingNewNum = false;
    }
    
    if (displayContent === "0" && number === ".") {
        display.textContent += number;
        return awaitingNewNum = false;
    }

    if (awaitingNewNum && displayContent !== "-" || awaitingNewNum && number === ".") {
        display.textContent = (number === ".") ? "0." : number;
        return awaitingNewNum = false;
    }

    display.textContent += number;
    awaitingNewNum = false;
}

function handleEqualsClick() {
    num2 = awaitingNewNum ? null : Number(display.textContent);

    if (num1 === null || num2 === null || operator === null) return;

    num1 = Math.round(operate(operator, num1, num2) * 100) / 100;
    display.textContent = num1;

    num2 = operator = null;
    awaitingNewNum = newOperation = true;
}

function handleRemove() {
    const content = display.textContent.split("");
    content.pop();
    display.textContent = content.join("");
}

function add(num1, num2) { return num1 + num2 }
function subtract(num1, num2) { return num1 - num2 }
function multiply(num1, num2) { return num1 * num2 }
function divide(num1, num2) {
    if (num2 === 0) {;
        dialog.classList.add('is-visible');
        setTimeout(() => dialog.classList.remove('is-visible'), 2200);
        return 0;
    }
    return num1 / num2;
}

function handleClear() {
    display.textContent = "0";
    num1 = num2 = null;
    awaitingNewNum = true;
    currentNumber = operator = "";
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}