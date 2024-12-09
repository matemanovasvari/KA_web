function invert(array) {
    
    let invertedArray = [];

    array.forEach(element => {
        invertedArray.push(element*-1);
    });

    return invertedArray;
}