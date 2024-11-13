function bmi(weight, height) {
  let calculatedBMI = weight / Math.pow(height, 2);

  switch(true){
    case (calculatedBMI <= 18.5):
      return "Underweight";
    case (calculatedBMI <= 25.0):
      return "Normal";
    case (calculatedBMI <= 30.0):
      return "Overweight";
    case (calculatedBMI > 30):
      return "Obese";
  }
}