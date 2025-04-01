import sqlite from 'sqlite3';

const db = new sqlite.Database('./data/database.sqlite');

export function dbAll(sql, params = []){
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        });
    });
}

export function dbGet(sql, params = []){
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        });
    });
}

export function dbRun(sql, params = []){
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err){
            if(err){
                reject(err);
            }
            else{
                resolve(this);
            }
        });
    });
}

export async function initializeDatabase() {
    await dbRun("DROP TABLE IF EXISTS wizards;");
    await dbRun("CREATE TABLE IF NOT EXISTS wizards (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, magic_wand STRING, house_name STRING);")

    const wizards = [
        {name:"Oz", magic_wand:"dragon heart string", house_name:"Griffindor"},
        {name:"Tűzvarázsló", magic_wand:"dragon heart string", house_name:"Hufflepuff"},
        {name:"Luke Skywalker", magic_wand:"lightsaber", house_name:"Slitherin"}
    ]

    for(const wizard of wizards){
        await dbRun("INSERT INTO wizards (name, magic_wand, house_name) VALUES (?, ?, ?);", [wizard.name, wizard.magic_wand, wizard.house_name]);
    }
}