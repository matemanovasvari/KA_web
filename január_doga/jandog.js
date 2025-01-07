function getCount(str) {
    let vowels = ["a", "e", "i", "o", "u"];
    let count = 0;

    for(let i = 0; i < str.length; i++)
      {
        if(vowels.includes(str[i]))
          {
            count++;
          }
      }
    return count;
}

function filter_list(l) {
    let newList = [];

    for(let i = 0; i < l.length; i++)
      {
        if(Number.isInteger(l[i]))
          {
            newList.push(l[i])
          }
      }
    return newList
}

function hasUniqueChars(str){
    let usedCharacters = [];

    for(let i = 0; i < str.length; i++)
      {
        if(usedCharacters.includes(str[i]))
          {
            return false;
          }
        else
          {
            usedCharacters.push(str[i]);
          }
      }
    return true;
}

function divisors(integer) {
    let divisors = [];

    for (let i = 2; i < integer; i++) {
        if (integer % i == 0){
            divisors.push(i);
        }
    }

    return divisors.length ? divisors : `${integer} is prime`;
}