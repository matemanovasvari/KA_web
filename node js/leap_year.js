import input from "./input.js";

var yearToCheck = parseFloat(await input("Enter the year:! "));

var isLeapYear = false;

if(yearToCheck % 4 == 0){
    isLeapYear = true;
}
else{
    isLeapYear = false;
}

console.log(`${isLeapYear ? "This year is a leap year" : "This year isn't a leap year"}`);