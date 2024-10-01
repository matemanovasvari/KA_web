import input from './input.js';

const mass = parseFloat(await input("Please type in your weight!: "));
const height = parseFloat(await input("Please type in your height in meters!: "));

console.log(`Your bmi is: ${mass / (height ** 2)}`);