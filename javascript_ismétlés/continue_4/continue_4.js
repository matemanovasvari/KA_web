for(var i = 1; i <= 100; i++){
    if(i % 3 == 0){
        continue;
    }
    document.getElementById("output").innerHTML += `${i}, `;
}