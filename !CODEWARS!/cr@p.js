function crap(x, bags, cap){
    let numberofcrap = 0;
    let capacity = bags * cap;

    for (let i = 0; i < x.length; i++) {

        for (let j = 0; j < x[i].length; j++) {
            if (x[i][j] === "@") {
                numberofcrap++;
            }
            else if (x[i][j] === "D") {
                return "Dog!!";
            }
        }
    }

    if (numberofcrap > capacity) {
        return "Cr@p";
    }
    
    return "Clean";
}