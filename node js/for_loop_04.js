import input from "./input.js";

var my_string = await input("Enter a string!: ");

for (var i = 0; i < my_string.length; i++) {
    console.log(my_string[i]);
}