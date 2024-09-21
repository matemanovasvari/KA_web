let number = 10;
    let outputDiv = document.getElementById('output');
    let output = '';

    while (number <= 30) {
        let divisors = [];
        let i = 1;

        while (i <= number) {
            if (number % i === 0) {
                divisors.push(i);
            }
            i++;
        }

        output += number + ": " + divisors.join(", ") + "<br>";

        number++;
    }

    outputDiv.innerHTML = output;