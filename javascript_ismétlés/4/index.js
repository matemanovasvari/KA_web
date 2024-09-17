function GradeScore(){
    var score = parseInt(document.getElementById("score").value);

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

    document.getElementById("grade").innerHTML = `Your grade is ${grade}`;
}