function digitsAverage(n) {
    let digits = n.toString().split('').map(Number);
    
    while (digits.length > 1) {
        digits = digits.map((_, i) => i < digits.length - 1 ? Math.ceil((digits[i] + digits[i + 1]) / 2) : null).filter(num => num !== null);
    }
    
    return digits[0];
}