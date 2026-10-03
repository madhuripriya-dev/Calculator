
let currentOperand = "0";
let previousOperand = "";
let operation = null;

function updateDisplay() {
    document.getElementById("current-operand").innerText =
        currentOperand === "" ? "" : currentOperand;

    document.getElementById("previous-operand").innerText =
        previousOperand + " " + (operation || "");
}

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) {
        return;
    }

    if (currentOperand === "Error") {
        currentOperand = number === "." ? "0." : number;
    } else if (number === ".") {
        if (currentOperand === "" || currentOperand === "0") {
            currentOperand = "0.";
        } else {
            currentOperand += number;
        }
    } else if (currentOperand === "" || currentOperand === "0") {
        currentOperand = number;
    } else {
        currentOperand += number;
    }

    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === "" && previousOperand === "") return;

    if (previousOperand !== "" && currentOperand !== "") {
        calculate();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";

    updateDisplay();
}

function calculate() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = prev + current;
            break;

        case "-":
            result = prev - current;
            break;

        case "*":
            result = prev * current;
            break;

        case "/":
            result = current === 0 ? "Error" : prev / current;
            break;

        default:
            return;
    }

    currentOperand = result.toString();
    previousOperand = "";
    operation = null;

    updateDisplay();
}

function clearScreen() {
    currentOperand = "0";
    previousOperand = "";
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === "Error") {
        clearScreen();
        return;
    }

    currentOperand = currentOperand.toString().slice(0, -1);

    if (currentOperand === "") {
        currentOperand = "0";
    }

    updateDisplay();
}

/* Keyboard Support */
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    }
    else if (key === ".") {
        appendNumber(".");
    }
    else if (["+", "-", "*", "/"].includes(key)) {
        appendOperator(key);
    }
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        event.preventDefault();
        deleteNumber();
    }
    else if (key === "Escape") {
        clearScreen();
    }
});

updateDisplay();