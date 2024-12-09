function XO(str) {
    let xCount = 0;
    let oCount = 0;
     let strLower = str.toLowerCase();
    
    for (let i = 0; i < str.length; i++)
    {
        if(strLower[i] == "x"){
            xCount += 1;
        }
        else if(strLower[i] == "o"){
            oCount += 1;
        }
    };

    if(xCount == oCount){
        return true;
    }
    else if(xCount == 0 && oCount == 0){
        return false;
    }
    return false;
}