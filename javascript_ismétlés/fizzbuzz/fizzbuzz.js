var strings = [];
var output = "";

for(var i = 1; i <=100; i++){
    if (i % 3 == 0 && i % 5 == 0){
        strings.push("fizzbuzz");
    }
    else if(i % 3 == 0){
        strings.push("fizz"); 
    }
    else if(i % 5 == 0){
        strings.push("buzz");
    }
    else{
        strings.push(i.toString());
    }
}

output = strings.join(", ")

document.write(output)