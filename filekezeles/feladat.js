import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import input from './input.js';

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(_dirname, "feladat_adatok.json");

let data = [
    {name: 'Abel'}, {name: 'Bob'}, {name: 'Cedric'}
]

function writeToFile(data){
    try{
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
    catch (err) {
        console.log(err);
    };
}

function readFromFile(filePath){
    try{
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    catch (err) {
        console.log(err);
    };
}

writeToFile(data);

const content = readFromFile(filePath);
content.push({name : "Géza"})
content.push({name : "Pisti"})
content.push({name: "Zoli"})

writeToFile(content)

let newContent = readFromFile(filePath)
console.log(newContent)
