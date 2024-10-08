import input from "./input.js";

var number = parseInt(await input("Enter a number!: "));
var digits = number.toString().split('');

var sum = 0;

for (let i = 0; i < digits.length; i++){
    sum += parseInt(digits[i])
}
var average = sum / digits.length;

console.log(`The average of digits is ${average}.`);