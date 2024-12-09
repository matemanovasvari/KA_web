function DNAStrand(dna) {
    const complement = {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C'
    };

    return dna.split('').map(base => complement[base]).join('');
}