/*
Egészítsd ki a seconds() függvényt!
A függvény egy stringet kap paraméterül, mely óra:perc:másodperc formátumú.
Visszatérési értéke egy szám, mely megadja, hogy az adott óra:perc:másodperc időponttól hány másodperc van még hátra a napból.
Például:
'14:34:42' -> 33918
*/
function seconds(time) {
    var times = time.split(":");

    var hoursInSecs = times[0] * 3600;
    var minutesInSecs = times[1] * 60;
    var secs = times[2];

    secondsLeft = 86400 - (hoursInSecs + minutesInSecs + secs);

    return secondsLeft;
}

/*
Egészítsd ki a divisors() függvényt!
A függvény egy pozitív egész számot kap paraméterül.
Visszatérési értéke egy tömb, mely a szám osztóit tartalmazza növekvő sorrendben.
Például: 4 -> [1, 2, 4]
*/
function divisors(number){
    let divisors = [];

    for(let i = 1; i <= number; i++){
        if (number % i == 0) {
            divisors.push(i);
        }   
    }

    return divisors.sort((a, b) => a - b);
}

/*
Egészítsd ki a cuboid() függvényt!
A függvény három nem negatív számot kap paraméterül, melyek egy téglatest éleinek hossza.
Visszatérési értéke egy tömb, a téglatest felszíne és térfogata.
Ha a téglatest nem létrezik, pl. egyik éle negatív vagy nulla, akkor a felszín és térfogat 0.
Például: 10.4, 13.5, 8.2 -> [672.76, 1151.28]
*/
function cuboid(a, b, c) {
    var answers = [];
    let surfaceArea;
    let volume;

    if(a <= 0 || b <= 0 || c <= 0){
        surfaceArea = 0;
        volume = 0;
    }
    else{
        surfaceArea = 2 * (a * b + b * height + a * c);
        volume = a * b * c;
    }

    answers.push(surfaceArea, volume);

    return answers;
}

/*
Egészítsd ki az isLeapYear() függvényt!
A függvény egy évszámot kap paraméterül.
Ha az évszám szökőév, akkor a visszatérési érték true, különben false.

Az év szökőév, ha:
Osztható 4-gyel, kivéve ha:
Osztható 100-zal, akkor nem szökőév, kivéve ha:
Osztható 400-zal, akkor mégis szökőév.
*/


function isLeapYear(year)
{   
    if(year % 4 == 0 && year % 400 && year % 100 != 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
