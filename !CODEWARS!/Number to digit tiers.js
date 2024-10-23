function createArrayOfTiers(num) {
    let results = [];
    let strNum = num.toString();

    for(let i = 1; i <= strNum.length; i++){
        results.push(strNum.slice(0,i));
    }

    return results;
}

console.log(createArrayOfTiers(420));