function CalculateBMI(){
    const mass = parseFloat(document.getElementById("mass").value);
    const height = parseFloat(document.getElementById("height").value);

    document.getElementById("bmi").innerHTML = `Your bmi is: ${Math.round((mass / Math.pow(height, 2)) * 100) / 100}`;   
}