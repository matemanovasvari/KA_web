function timeConvert(num) { 
    if(num <= 0){
        return "00:00";
    }

    let minutes = Math.floor(num / 60) < 10 ? `0${Math.floor(num / 60)}` : `${Math.floor(num / 60)}`;
    let remainder = (num % 60) < 10 ? `0${num % 60}` : `${num % 60}`;

    return `${minutes}:${remainder}`;
}