function whichPostcode(postcode){
    const trimmedPostcode = postcode.trim();

    let spaceCount = 0;
    let numberCount = 0;
    let letterCount = 0;
    
    for (let i = 0; i < trimmedPostcode.length; i++) {
        const char = trimmedPostcode[i];
    
        if(char == " ") {
            spaceCount++;
        }
        else if(!isNaN(char)){
            numberCount++;
        }
        else{
            letterCount++;
        }
    }

    if(spaceCount == 1 && (letterCount == 3 || letterCount == 4) && (numberCount == 2 || numberCount == 3) && !isNaN(trimmedPostcode[trimmedPostcode.length - 3])){
        return "GB";
    }
    if(spaceCount == 1 && letterCount == 0 && numberCount == 5 && trimmedPostcode[3] == " "){
        return "SK";
    }
    return "Not valid";
}

console.log(whichPostcode("25 743"))