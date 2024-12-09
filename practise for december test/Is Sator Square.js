function isSatorSquare(tablet) {
    const n = tablet.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (tablet[i][j] !== tablet[j][i] || tablet[i][j] !== tablet[n - 1 - j][n - 1 - i] || tablet[i][j] !== tablet[n - 1 - i][n - 1 - j]) {
                return false;
            }
        }
    }

    return true;
}