import input from './input.js';

var str = await input("Enter a string!: ");
var output = "";

for (let i = 0; i < str.length; i++) {
    if (!str[i].match(/[a-zA-Z]/)) {
        break;
    }
    output += `${str[i]}`;
}

console.log(output);