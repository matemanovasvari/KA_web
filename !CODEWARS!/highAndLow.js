function highAndLow(numbers){
    let listOfNumbers = numbers.split(" ");
    return `${Math.max(...listOfNumbers)} ${Math.min(...listOfNumbers)}`;
}