function stringClean(str){
    let result = "";

    for(let i = 0; i < str.length; i++){
        if(!/\d/.test(str[i])){
            result += str[i];
        }
    }

    return result;
}

console.log(stringClean("St432ri43231ng cle3423a143ni5434ng!"));