let num1 = null;
let num2 = null;
let operator = null;
let awaitingNewNum = true;

const dispOperation = document.getElementById("operation");
dispOperation.scrollLeft = dispOperation.scrollWidth - dispOperation.clientWidth;

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const equals = document.getElementById("equals");
const btnClear = document.getElementById("clear")

operators.forEach(op => {
    op.addEventListener("click", (e) => {
        dispOperation.scrollLeft = dispOperation.scrollWidth - dispOperation.clientWidth;

        setNumbers()
        operator = e.target.id;
        awaitingNewNum = true;
        current = ""
        
    })
})

let current = "";
numbers.forEach(number => {
    number.addEventListener("click", e => {
        dispOperation.scrollLeft = dispOperation.scrollWidth - dispOperation.clientWidth;
        
        if (dispOperation.textContent === "0") {
            current = e.target.id;
            dispOperation.textContent = current;
            return awaitingNewNum = false;
        }
        current += e.target.id
        dispOperation.textContent = current;
        awaitingNewNum = false;
    })
})

equals.addEventListener("click", () => {
    if (operator === null || num1 === null) return;
    if (awaitingNewNum) return;
        
    num2 = Number(dispOperation.textContent);
    num1 = operate(operator, num1, num2);
    dispOperation.textContent = num1;
    num2 = null;
    current = "";
    awaitingNewNum = true;
})

btnClear.addEventListener("click", () => {
    dispOperation.textContent = "0"
    num1 = num2 = null;
    awaitingNewNum = true;
    operator = ""
    current = ""
})

function setNumbers() {
    if (num1 === null) {
        num1 = Number(current);
        return;
    }

    if (awaitingNewNum) return;
    
    num2 = Number(dispOperation.textContent);
    num1 = operate(operator, num1, num2);
    dispOperation.textContent = num1;
    num2 = null;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        alert("Come on, we can do better than this")
        return 0;
    }
    return num1 / num2;
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