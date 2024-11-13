function divisors(integer) {
    let divisors = [];

    for (let i = 2; i < integer; i++) {
        if (integer % i == 0){
            divisors.push(i);
        }
    }

    return divisors.length ? divisors : `${integer} is prime`;
}