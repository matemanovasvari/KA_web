import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(_dirname, "adatok.json");

const users = [
    {id: 1, name:"Adam"},
    {id: 2, name:"Bianka"},
    {id: 3, name:"Cecil"}
]

try{
    fs.writeFileSync(filePath, JSON.stringify(users));
}
catch (err) {
    console.log(err);
};

let content = '';
try{
    content = fs.readFileSync(filePath, 'utf-8');
}
catch (err) {
    console.log(err);
};

const newData = JSON.parse(content);
console.log(newData)