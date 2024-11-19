function myParseInt(str) {
    str = str.trim();

    return /^\d+$/.test(str) ? parseInt(str) : "NaN";
}

console.log(myParseInt("GSRGDTHSDGSDRG12345"))