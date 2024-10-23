function highAndLow(numbers){
    let listOfNumbers = numbers.split(" ");
    return `${Math.max(...listOfNumbers)} ${Math.min(...listOfNumbers)}`;
}

console.log(highAndLow("4 1 6 3 9"));