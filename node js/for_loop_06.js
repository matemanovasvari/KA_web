import input from "./input.js";

const factorial_number = parseInt(await input("Enter a number!: "));

var factorial_result = 1;

for(var i = 1; i <= factorial_number; i++){
    factorial_result *= i;
}

console.log(`${factorial_number} factorial is ${factorial_result}.`);