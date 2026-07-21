let num1 = null;
let num2 = null;
let operator = null;
let awaitingNewNum = true;
let newOperation = false;

const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const btnEquals = document.getElementById("equals");
const btnClear = document.getElementById("clear");
const btnRemove = document.getElementById("remove-last");
const dialog = document.getElementById("dialog");
const buttons = document.querySelectorAll("button");

const keyPress = new Audio('./audio/keypress.mp3');
const notif = new Audio('./audio/notif.mp3'); 
keyPress.load();
notif.load();

buttons.forEach(button => {
    button.addEventListener("click", () => {
        keyPress.currentTime = 0;
        keyPress.play();
    });
    
    button.addEventListener('contextmenu', e => e.preventDefault());
})

operators.forEach(op => {
    op.addEventListener("click", e => {
        handleOperationsClick(e.target.id);
    }); 
})

numbers.forEach(number => {
    number.addEventListener("click", e => {
        handleNumbersClick(e.target.id);
    });
})

btnEquals.addEventListener("click", () => handleEqualsClick());
btnClear.addEventListener("click", () => handleClear());
btnRemove.addEventListener("click", () => handleRemove());

window.addEventListener("keydown", e => {
    const number = "1234567890.".includes(e.key);
    const operator = "*-+/".includes(e.key);
    const equals = e.key === "=" || e.key === "Enter";
    const backspace = e.key === "Backspace";
    const esc = e.key === "Escape";

    if (number || operator || equals || backspace || esc) {
        let button = document.getElementById(e.key);

        if (equals) { button = btnEquals }
        if (backspace) { button = btnRemove }
        if (esc) { button = btnClear}

        button.classList.add("active");
    }

    if (number) return handleNumbersClick(e.key);
    if (operator) return handleOperationsClick(e.key);
    if (equals) return handleEqualsClick();
    if (backspace) return handleRemove();
    if (esc) return handleClear();
})

window.addEventListener("keyup", e => {
    const number = "1234567890.".includes(e.key);
    const operator = "*-+/".includes(e.key);
    const equals = e.key === "=" || e.key === "Enter";
    const backspace = e.key === "Backspace";
    const esc = e.key === "Escape";

    if (number || operator || equals || backspace || esc) {
        let button = document.getElementById(e.key);

        if (equals) { button = btnEquals }
        if (backspace) { button = btnRemove }
        if (esc) { button = btnClear}

        button.classList.remove("active");
    }
})

function adjustScrollLocation() {
    display.scrollLeft = display.scrollWidth - display.clientWidth;
}
adjustScrollLocation();

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

    if (awaitingNewNum && operatorClicked == "-") {
        display.textContent = operatorClicked;
        return awaitingNewNum = false;
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
    if (display.textContent.length === 1) return display.textContent = 0;

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
        setTimeout(() => dialog.classList.remove('is-visible'), 2000);
        notif.currentTime = 0;
        notif.volume = 0.5;
        notif.play();
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