function Check(){
    var yearToCheck = parseFloat(document.getElementById("year").value);

    var isLeapYear = false;

    if((yearToCheck % 400 == 0) || (yearToCheck % 4 == 0 && yearToCheck % 100 != 0)){
        isLeapYear = true;
    }
    else{
        isLeapYear = false;
    }

    document.getElementById("result").innerHTML = `${isLeapYear ? "This year is a leap year" : "This year isn't a leap year"}`
}