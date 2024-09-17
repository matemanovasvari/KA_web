function Start(){
    var lenght = parseFloat(document.getElementById("lenght").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);

    var surfaceArea = 2 * (lenght * width + width * height + lenght * height);
    var volume = lenght * width * height;

    document.getElementById("SURFICE_AREA").innerHTML = `The surfice area is: ${surfaceArea}`;
    document.getElementById("VOLUME").innerHTML = `The volume is: ${volume}`;
}