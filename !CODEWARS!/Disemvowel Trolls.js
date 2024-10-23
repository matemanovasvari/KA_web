function disemvowel(str) {
    let vowels = ["a", "i","o","e","u","A", "I","O","E","U"];
    let outputStr = "";

    for(let i = 0; i < str.length; i++){
        if(!vowels.includes(str[i])){
            outputStr += str[i];
        }
    }

    return outputStr;
}

console.log(disemvowel("HellO World!"));