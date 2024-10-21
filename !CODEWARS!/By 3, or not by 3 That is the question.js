function divisibleByThree(str){
    let sum = 0;
    
    for(let i = 0; i < str.lenght; i++){
        sum += parseInt(str[i]);
    }

    if(Number.isInteger(sum / 3)){
        return true;
    }
    else{
        return false;
    }
}