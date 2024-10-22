/*
sortByLength() - String tömböt a szavak hossza szerint rendezi és a rendezett tömböz adja vissza
sortByLengthAsc() - String tömböt a szavak hossza szerint rendezi ABC sorrendbe és a rendezett tömböz adja vissza
sortFrom15() - számokat rendez a 15-től való távolság alapján és a rendezett tömböt adja vissza
addAsterisk() - String tömb mindegy elemének az elejére és végére egy csillagot tesz és visszaadja a módosított tömböt
between5And15() - számokat tartalmazó tömb 5 és 15 közötti elemeit adja vissza egy tömbben
isAllOdd() - számokat tartalmazó tömb minden eleme páratlan-e. Visszatérési érték true vagy false
hasEven() - számokat tartalmazó tömb tartalmaz-e páros elemet. Visszatérési érték true vagy false
sigma() -  számokat tartalmazó tömb elemeit összeszorozza és a szorzatot adja vissza 
 */
const numbers = [2,13,3,7,17,5,11,19,9];
const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob'];
const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry'];

function sortByLength(arr){
    return arr.sort((a, b) => a.length - b.length);
}

function sortByLengthAsc(arr){
    arr.sort((a, b) => {
        if(a.length === b.length){
            return a.localeCompare(b);
        }
        else{
            return a.length - b.length;
        }
    })
    return arr;
}

function sortFrom15(arr){
    return arr.sort((a, b) => Math.abs(a - 15) - Math.abs(b - 15));
}

function addAsterisk(arr){
    return arr.map(item => `*${item}*`);
}