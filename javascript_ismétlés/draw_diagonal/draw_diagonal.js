function Generate() {
    const size = parseInt(document.getElementById("size").value);

    let squareString = "";

    for (let i = 0; i < size; i++) {
        let line = "";
        for (let j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || i === j) {
                line += "%";
            } else {
                line += "///";
            }
        }
        squareString += line + "<br>";
    }

    document.getElementById('squareOutput').innerHTML = squareString;
}