function descendingOrder(n){
    let digits = [];
    let numberStr = n.toString();
    let result = "";

    for (let i = 0; i < numberStr.length; i++) {
        digits.push(numberStr[i]);
    }

    let sortedDigits = digits.sort((a,b) => (a -b)).reverse();

    sortedDigits.forEach(e => {
        result += e;
    });

    return parseInt(result);
}

console.log(descendingOrder(123654))