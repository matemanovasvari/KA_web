var isSquare = function(n){
    let sqrOfN = Math.sqrt(n);

    return sqrOfN === Math.floor(sqrOfN) && sqrOfN * sqrOfN === n;
}