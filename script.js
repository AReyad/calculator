const clearBtn = document.querySelector('#clear-all');
const deleteBtn = document.querySelector('#delete');
const plusBtn = document.querySelector('#plus');
const minusBtn = document.querySelector('#minus');
const mutliplyBtn = document.querySelector('#multiply');
const divideBtn = document.querySelector('#divide');
const equalBtn = document.querySelector('#equal');
const valueInput = document.querySelector('#input');
const operationInput = document.querySelector('#operation');
const operatorBtns = document.querySelectorAll('.operator')
const digitBtns = document.querySelectorAll('.digit')
const dotBtn = document.querySelector('.decimal-dot')

let calculationDone = false;
let firstNumber = "";
let secondNumber = "";
let operator = "";
let operation;
let result;

function add(a,b) {
    return Number(a) + Number(b);
}

function subtract(a,b) {
    return Number(a) - Number(b);
}

function divide(a,b) {
    if(Number(b) === 0) {
        return "Cannot divide by 0" 
    } 
    return Number(a) / Number(b);
}

function multiply(a,b) {
    return Number(a) * Number(b);
}

function operate(num1,op,num2) {
    if(op == "+") {
        result = add(num1,num2);
        if(result % 1 !== 0) {
           result =  Math.round(result * 100) / 100;
        }
      return firstNumber = result;
    } else if(op == "-") {
        result = subtract(num1,num2);
        if(result % 1 !== 0) {
           result =  Math.round(result * 100) / 100
        }
        return firstNumber = result;
    } else if(op == "*") {
        result = multiply(num1,num2);
        if(result % 1 !== 0) {
           result =  Math.round(result * 100) / 100
        }
        return firstNumber = result;
    } else if(op == "/") {
        result = divide(num1,num2)
        if(result === "Cannot divide by 0") {
           valueInput.placeholder = result;
           firstNumber = ""
           return;
        }
        if(result % 1 !== 0) {
           result =  Math.round(result * 100) / 100
        }
        return firstNumber = result;
    } 
}

function updateDisplay() {
    operationInput.value = `${firstNumber} ${operator}`
    if(operation) {
        operationInput.value = operation
    }
    secondNumber = ""
}

function evaluate(operator){
    if(secondNumber !== "") {
        operation = `${firstNumber} ${operator} ${secondNumber} =`
    }
    operate(firstNumber, operator, secondNumber)
    valueInput.value = result
    updateDisplay()
    calculationDone = true;
}

function clearDisplay() {
    operator = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
    valueInput.value = ""
    operationInput.value = `0`
}

function addDecimalPoint() {
    if(calculationDone) {
        firstNumber = ""
        calculationDone = false;
    }
    if(operator === "" && !firstNumber.includes(".")) {
        if (firstNumber === "") firstNumber = "0"; 
        firstNumber += ".";
        valueInput.value = firstNumber;
    } else if(operator !== "" && !secondNumber.includes(".")) {
        if (secondNumber === "") secondNumber = "0";
        secondNumber += ".";
        valueInput.value = secondNumber;
    }
}

function deleteNumber(){
    if(!operator && firstNumber.length >= 1){
        firstNumber = firstNumber.slice(0,[firstNumber.length -1])
        valueInput.value = firstNumber
    } else {
        secondNumber = secondNumber.slice(0,[secondNumber.length -1])
        valueInput.value = secondNumber
    }
}

digitBtns.forEach((digitBtn) => {
    digitBtn.addEventListener('click', () => {
        if(operator === "" && calculationDone) {
            calculationDone = false;
            firstNumber = ""
            firstNumber += digitBtn.textContent
            valueInput.value = firstNumber
        } else if(valueInput.placeholder == "Cannot divide by 0") {
            valueInput.placeholder = "0"
        }else if(operator !== "") {
            valueInput.value = ""
            secondNumber += digitBtn.textContent
            valueInput.value = secondNumber
            operationInput.value = `${firstNumber} ${operator}`
        } else if(operator == "") { 
            firstNumber += digitBtn.textContent
            valueInput.value = firstNumber
        }
    })
});

operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener('click', (op) => {
        switch (operatorBtn.id) {
            case "plus":   
                op = "+"
                operator == "" ? operator = op : operator == op ? evaluate(op) : evaluate(operator)
                operator = op
                updateDisplay()
            break;
            case "minus":
                op = "-"
                operator == "" ? operator = op : operator == op ? evaluate(op) : evaluate(operator)
                operator = op
                updateDisplay()
            break;
            case "multiply":
                op = "*"
                operator == "" ? operator = op : operator == op ? evaluate(op) : evaluate(operator)
                operator = op
                updateDisplay()
            break;
            case "divide":
                op = "/"
                operator == "" ? operator = op : operator == op ? evaluate(op) : evaluate(operator)
                operator = op
                updateDisplay()
            break;
            case "equal":
                evaluate(operator)
                op = ""
                operator = op
                updateDisplay()
                calculationDone = true;
            break;
            case "clear-all":
                clearDisplay();
            break;
            case "delete":
                deleteNumber();
            break;
        }
    })
})

dotBtn.addEventListener('click', addDecimalPoint)

