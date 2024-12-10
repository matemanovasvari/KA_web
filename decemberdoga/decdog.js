function maskify(cc) {
    if (cc.length <= 4) {
        return cc;
    }

    const maskedPart = "#".repeat(cc.length - 4);
    const visiblePart = cc.slice(-4);

    return maskedPart + visiblePart;
}

function timeConvert(num) { 
    if(num <= 0){
        return "00:00";
    }

    let minutes = Math.floor(num / 60) < 10 ? `0${Math.floor(num / 60)}` : `${Math.floor(num / 60)}`;
    let remainder = (num % 60) < 10 ? `0${num % 60}` : `${num % 60}`;

    return `${minutes}:${remainder}`;
}

function isTriangle(a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) {
      return false;
    }
  
    return a + b > c && a + c > b && b + c > a;
}

function createArrayOfTiers(num) {
    let results = [];
    let strNum = num.toString();

    for(let i = 1; i <= strNum.length; i++){
        results.push(strNum.slice(0,i));
    }

    return results;
}