let num1 = 0;
let num2 = 0;
let operator = "";

const dispOperation = document.getElementById("operation");
dispOperation.scrollLeft = dispOperation.scrollWidth - dispOperation.clientWidth;

const dispResults = document.getElementById("results");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const equals = document.getElementById("equals");
const btnClear = document.getElementById("clear")


operators.forEach(op => {
    op.addEventListener("click", (e) => {
        dispOperation.scrollLeft = dispOperation.scrollWidth - dispOperation.clientWidth;
        
        dispOperation.textContent += e.target.id
    })
})

numbers.forEach(number => {
    number.addEventListener("click", e => {
        dispOperation.scrollLeft = dispOperation.scrollWidth - dispOperation.clientWidth;

        if (dispOperation.textContent === "0") return dispOperation.textContent = e.target.id;
        
        dispOperation.textContent += e.target.id;
    })
})

equals.addEventListener("click", () => {
    console.log("equals is clicked")
})

clear.addEventListener("click", () => {
    dispOperation.textContent = "0"
    dispResults.textContent = ""
    num1 = num2 = 0;
    operator = ""
})

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
        alert("Are you an idiot sandwich?")
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