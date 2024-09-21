function Start(){
    let str = document.getElementById("str").value;

    let output = document.getElementById('output');
    
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (!char.match(/[a-zA-Z]/)) {
            break;
        }
        output.innerHTML += char;
    }
}