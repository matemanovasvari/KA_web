function SplitString(){
    var my_string = document.getElementById("str").value;
    
    for (var i = 0; i < my_string.length; i++) {
        document.write(my_string[i] + "<br>");
    }
}