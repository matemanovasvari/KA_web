function CalculateSecs(){
    const currentHours = 14;
    const currentMinutes = 34;
    const currentSeconds = 42;

    const hoursInSecs = currentHours * 3600;
    const minutesInSecs = currentMinutes * 60;

    const remainingSecs = 86400 - (hoursInSecs + minutesInSecs + currentSeconds);

    document.getElementById("answer").innerHTML = `${remainingSecs} are left of the day.`;
}