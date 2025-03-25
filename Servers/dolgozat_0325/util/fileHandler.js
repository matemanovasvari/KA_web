import fs from "fs";
import path from "path";
import __dirname from "./rootpath.js";

const filePath = path.join(__dirname, "data", "movies.json");

export function getData(){
    try{
        const content = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(content);
        return data;
    }
    catch(err){
        console.log(err);
        return [];
    }
};

export function writeData(data){
    try{
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
    catch(err){
        console.log(err);
    }
};