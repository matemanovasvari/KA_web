function disemvowel(str) {
    for(let i = 0; i < str.lenght; i++){
        if(str[i] == ["u","i","a","e","o","U","I","A","E","O"]){
            str[i].replaceAll("");
        }
        else{
            str.replaceAll(str[i]);
        }
    }
    return str;
}
console.log(disemvowel("This website is for losers LOL!"))