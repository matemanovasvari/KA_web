function divisibleByThree(str) {
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        sum += parseInt(str[i]);
    }

    if (Number.isInteger(sum / 3)) {
        return true;
    }

    return false;
}

console.log(divisibleByThree("125421"));
console.log(divisibleByThree("124"));