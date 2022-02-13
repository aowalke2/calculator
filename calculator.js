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
let operator;
let newOperator;  //Works for when you want to ececute the expresion by operator
let numberA;
let numberB;
let solution;
let operatorClick = false;

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

function equals(a, b){

}

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        //I think the key here is to check for certain conditions
        //First check may just need to see if the expression string is empty
        
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

        if(numberA && numberB){
            solution = operate(newOperator, numberA, numberB);
            expresion.textContent = solution+operatorString;
            input.textContent = solution;
            numberA = solution;
            numberB = "";
        }
        
        inputString = "";
        operatorClick = true;
        
    });
});

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputString += button.textContent;
        input.textContent = inputString;
        if(numberA){
            numberB = parseInt(inputString);
            //xpresion.textContent = solution+operator;
            newOperator = operator;
        }
        else {
            numberA = parseInt(inputString);
        }
        operatorClick = false;
    });
});

equalButton.addEventListener('click', () => {
    if(numberA && numberB){
        solution = operate(newOperator, numberA, numberB);
        expresion.textContent = numberA + operatorString + numberB + equalButton.textContent;
        input.textContent = solution;
        numberA = solution;
        numberB = "";
    }

    inputString = "";
    operatorClick = true;
});

clearButton.addEventListener('click', () => {
    inputString = "";
    expresionString = "";
    input.textContent = 0;
    expresion.textContent = "";
    numberA = "";
    numberB = "";
    operatorClick = false;
});

