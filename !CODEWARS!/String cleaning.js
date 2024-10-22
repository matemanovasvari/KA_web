function stringClean(str){
    let result = "";

    for(let i = 0; i < str.length; i++){
        if(!/\d/.test(str[i])){
            result += str[i];
        }
    }

    return result;
}