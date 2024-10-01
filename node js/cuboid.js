import input from './input.js';

const lenght = parseFloat(await input("Cuboid's lenght: "));
const width = parseFloat(await input("Cuboid's width: "));
const height = parseFloat(await input("Cuboid's height: "));

const surfaceArea = 2 * (lenght * width + width * height + lenght * height);
const volume = lenght * width * height;

console.log(`The surfice area is: ${surfaceArea}`);
console.log(`The volume is: ${volume}`);