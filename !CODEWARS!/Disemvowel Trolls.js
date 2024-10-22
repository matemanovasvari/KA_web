function disemvowel(str) {
    return str.replaceAll('a','').replaceAll('i','').replaceAll('e','').replaceAll('o','').replaceAll('u','')
    .replaceAll('A','').replaceAll('I','').replaceAll('E','').replaceAll('O','').replaceAll('U','');
}
console.log(disemvowel("This website is for losers LOL!"))