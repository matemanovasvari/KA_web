function Calculate(){
    const lenght = parseFloat(document.getElementById("lenght").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);

    const surfaceArea = 2 * (lenght * width + width * height + lenght * height);
    const volume = lenght * width * height;

    document.getElementById("SURFACE_AREA").innerHTML = `The surfice area is: ${surfaceArea}`;
    document.getElementById("VOLUME").innerHTML = `The volume is: ${volume}`;
}