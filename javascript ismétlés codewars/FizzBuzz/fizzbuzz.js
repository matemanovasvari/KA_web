const fizzBuzz = n => {
    return {8: "FizzBuzz", 3: "Fizz", 5: "Buzz"}[(n % 3 === 0 ? 3 : 0) + (n % 5 === 0 ? 5 : 0)] || n;
};

console.log(fizzBuzz(15))