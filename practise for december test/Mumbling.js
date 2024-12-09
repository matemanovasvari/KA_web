function accum(s) {
    let result = "";

    for (let i = 0; i < s.length; i++) {
        const repeated = s[i].toLowerCase().repeat(i + 1);
        const output = repeated.charAt(0).toUpperCase() + repeated.slice(1);

        result += output + "-";
    }

    return result.slice(0, -1);
}