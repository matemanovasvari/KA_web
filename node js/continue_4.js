var list = [];
var output = "";

for(var i = 1; i <= 100; i++){
    if(i % 3 == 0){
        continue;
    }
    list.push(`${i}`);
}

output = list.join(", ");

console.log(output)