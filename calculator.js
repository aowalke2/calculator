const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll(".operator");
const input = document.querySelector('.input');
const expresion = document.querySelector('.expression');

let inputString = "";
let expresionString = "";
let operatorString = "";
let decimalString = "";
let operator;
let decimal;
let newOperator;  //Works for when you want to execute the expresion by operator
let numberA;
let numberB;
let solution;
let operatorClick = false;
let equalClick = false;
let decimalClick = false;
let floatCheck = false

function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

function operate(operator, a, b){
    if(operator == "division"){
        return divide(a, b);
    }
    else if(operator == "multiplication"){
        return multiply(a,b);
    }
    else if(operator == "subtraction"){
        return subtract(a,b);
    }
    else{
        return add(a,b);
    }
}

function parseInput(numberString){
    numberStringList = numberString.split("")
    if(numberStringList.includes(".")){
        return parseFloat(numberString);
    }
    else{
        return parseInt(numberString);
    }
}

clearButton.addEventListener('click', () => {
    input.textContent = 0;
    expresion.textContent = "";
    inputString = "";
    expresionString = "";
    operatorString = "";
    decimalString = "";
    operator = undefined;
    decimal = undefined;
    newOperator = undefined;
    numberA = undefined;
    numberB = undefined;
    solution = undefined;
    operatorClick = false;
    equalClick = false;
    decimalClick = false;
    floatCheck = false;
});

deleteButton.addEventListener('click', () => {
    inputList = inputString.split("")
    inputList.pop();
    if(inputList.length == 0){
        inputString = "";
        input.textContent = "0";
    }
    else{
        inputString = inputList.join("");
        input.textContent = inputString;
    }
});

equalButton.addEventListener('click', () => {
    if(Number.isFinite(numberA)){
        numberB = parseInput(inputString);
        newOperator = operator;
    }
    else {
        numberA = parseInput(inputString);
    }

    if(Number.isFinite(numberA) && Number.isFinite(numberB)){
        let floatCheck
        if(floatCheck == true){
            solution = Math.round(operate(newOperator, numberA, numberB)*1000000000000)/1000000000000;
        }
        else{
            solution = operate(newOperator, numberA, numberB);
        }
        expresion.textContent = numberA + operatorString + numberB + equalButton.textContent;
        input.textContent = solution;
        numberA = solution;
        numberB = "";
    }

    inputString = "";
    operatorClick = true;
    equalClick = true;
    decimalClick = false;
});

decimalButton.addEventListener('click', () => {
    if(decimalClick == false){
        decimal = decimalButton.id;
        decimalString = decimalButton.textContent;
        inputString += decimalString;
        input.textContent += decimalString;
        decimalClick = true; 
        floatCheck = true;
    }
});

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(inputString != ""){
            inputString += button.textContent;
        }
        else{
            inputString = button.textContent;
        }
        input.textContent = inputString;
        operatorClick = false;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operator = button.id;
        operatorString = button.textContent;

        if(operatorClick == false){
            if(input.textContent == "0"){
                inputString = "0";
                expresionString += (inputString+operatorString);
                expresion.textContent = expresionString;
            }
            else{
                expresionString += (inputString+operatorString);
                expresion.textContent = expresionString;
            }
        }

        if(equalClick == true){
            expresion.textContent = solution + operatorString;
        }

        if(Number.isFinite(numberA)){
            numberB = parseInput(inputString);
            newOperator = operator;
        }
        else {
            numberA = parseInput(inputString);
        }

        if(Number.isFinite(numberA) && Number.isFinite(numberB)){
            if(floatCheck == true){
                solution = Math.round(operate(newOperator, numberA, numberB)*1000000000000)/1000000000000;
            }
            else{
                solution = operate(newOperator, numberA, numberB);
            }
            expresion.textContent = solution+operatorString;
            input.textContent = solution;
            numberA = solution;
            numberB = "";
        }
        
        inputString = "";
        operatorClick = true;
        equalClick = false;
        decimalClick = false;
    });
});

