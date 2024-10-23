function DNAtoRNA(dna) {
    let rna = "";

    for(let i = 0; i < dna.length; i++){
        rna += dna[i] == "T" ? "U" : dna[i];
    }

    return rna;
}

console.log(DNAtoRNA("GACCGCCGCC"));