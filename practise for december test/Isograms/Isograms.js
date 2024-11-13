function isIsogram(str) {
    let chars = [];

    for (let char of str.toLowerCase()) {
        if (!chars.includes(char)){
            chars.push(char);
        } 
        else{
            return false;
        }
    }
    return true;
}