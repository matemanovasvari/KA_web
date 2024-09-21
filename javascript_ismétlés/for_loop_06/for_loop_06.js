function Calculate(){
    const factorial_number = parseInt(document.getElementById("number").value);

    var factorial_result = 1;

    for(var i = 1; i <= factorial_number; i++){
        factorial_result *= i;
    }

    document.getElementById("result").innerHTML = `${factorial_number} factorial is ${factorial_result}.`;
}