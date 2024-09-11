const display = document.querySelector(".display");

const numbers = document.querySelectorAll(".btn");

const operator = document.querySelectorAll(".operator");

const dot = document.querySelector(".dot");

const equal = document.querySelector(".equal");

const clear = document.querySelector(".clear");



let firstNumber = '';
let operatorValue = null;
let secondNumber = '';



numbers.forEach(number=>{
    number.addEventListener("click",()=>{
        

        
            if(operatorValue === null){
                firstNumber += number.textContent;
                display.value = firstNumber;
            }else{
                
                secondNumber += number.textContent;
                display.value = secondNumber;
            }
        

    })
});

operator.forEach(operator=>{
    operator.addEventListener("click",()=>{
       if(firstNumber !== ''){
            if(secondNumber !== ''){
                calculator();
            }
            operatorValue = operator.textContent;
            secondNumber = '';
            display.value = firstNumber;
        }

        if(operatorValue === "%"){
            const num1 = parseFloat(firstNumber);
            result = percentage(num1);
            display.value = result;
            console.log(display.value);
            firstNumber= result.toString();
            operatorValue = null;
            secondNumber = '';
    }
    })
})



equal.addEventListener("click",()=>{
    calculator();
});

function calculator (){
    if(firstNumber !=='' && operator !== null && secondNumber !== ''){
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);

        let result;
        if(operatorValue === "+"){
            result = addition(num1, num2);
        }else if(operatorValue === "-"){
            result = subtraction(num1, num2);
        }else if(operatorValue === "*"){
            result = multiple(num1, num2);
        }else{
            result = divide(num1, num2);
        }
         
         display.value = result;
         firstNumber= result.toString();
         operatorValue = null;
         secondNumber = '';


    }
   
}

clear.addEventListener("click",()=>{
    firstNumber = '';
    operatorValue = null;
    secondNumber = '';
    display.value = '';
    
});

function addition(num1, num2){
    return num1 + num2;
};

function subtraction(num1, num2){
    return num1 - num2;
};

function multiple(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 === 0){
        return "Can't divide by zero"
    }else{
        return num1/num2;
    }
    
}

function percentage(num1){
    return num1/100;
}


// Add keyboard input support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') { // Handle numbers and dot
        if (operatorValue === null) {
            firstNumber += key;
            display.value = firstNumber;
        } else {
            secondNumber += key;
            display.value = secondNumber;
        }
    }else if(['%'].includes(key)){
            const num1 = parseFloat(firstNumber);
            result = percentage(num1);
            display.value = result;
            console.log(display.value);
            firstNumber= result.toString();
            operatorValue = null;
            secondNumber = '';
    }
     else if (['+', '-', '*', '/'].includes(key)) { // Handle operators
        if (firstNumber !== '') {
            if (secondNumber !== '') {
                calculator();
            }
            operatorValue = key === '*' ? '*' : key; // Map '*' to multiplication
            secondNumber = '';
            display.value = firstNumber;
        }
    } else if (key === 'Enter' || key === '=') { // Handle equal
        calculator();
    } else if (key === 'Escape' || key === 'Backspace') { // Handle clear
        clear.click(); // Trigger clear button
    }
});
