function Calculate(){
    var number = parseInt(document.getElementById("number").value);
    var digits = number.toString().split('');

    var sum = 0;

    for (let i = 0; i < digits.length; i++){
        sum += parseInt(digits[i])
    }
    var average = sum / digits.length;

    document.getElementById("result").innerHTML = `The average of digits is ${average}.`;
}