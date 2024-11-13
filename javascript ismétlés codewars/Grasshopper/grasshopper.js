function getGrade (s1, s2, s3) {
    let average = (s1 + s2 + s3) / 3;

    switch(true){
        case (average <= 100 && average >= 90):
            return "A";
        case (average < 90 && average >= 80):
            return "B";
        case (average < 80 && average >= 70):
            return "C";
        case (average < 70 && average >= 60):
            return "D";
        default:
            return "F"
    }
}