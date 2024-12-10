function maskify(cc) {
    if (cc.length <= 4) {
        return cc;
    }

    const maskedPart = "#".repeat(cc.length - 4);
    const visiblePart = cc.slice(-4);

    return maskedPart + visiblePart;
}