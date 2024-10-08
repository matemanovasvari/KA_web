import input from "./input.js";

const size = parseInt(await input("Enter the size of the square"));

let squareString = "";

for (let i = 0; i < size; i++) {
    let line = "";
    for (let j = 0; j < size; j++) {
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || i === j) {
            line += "%";
        } else {
            line += " ";
        }
    }
    squareString += line + "\n";
}

console.log(squareString)