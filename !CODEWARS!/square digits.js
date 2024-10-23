function squareDigits(num){
    let digits = [];
    let numberStr = num.toString();
    let result = "";

    for (let i = 0; i < numberStr.length; i++) {
        digits.push(numberStr[i]);
    }

    digits.forEach(e => {
        result += Math.pow(e, 2);
    });

    return parseInt(result);
}

console.log(squareDigits(36))