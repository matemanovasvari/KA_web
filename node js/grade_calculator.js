import input from "./input.js";

var score = parseInt(await input("Enter the score!: "));

var grade = "";

if(score >= 100){
    grade = "A+";
}
else if(score >= 80){
    grade = "A";
} 
else if(score >= 60){
    grade = "B";
} 
else if(score >= 40){
    grade = "C";
}
else if(score >= 20){
    grade = "D";
}
else{
    grade = "F";
}

console.log(`Your grade is ${grade}`);