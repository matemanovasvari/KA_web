import express from 'express';
import { dbAll, initializeDatabase, dbGet, dbRun } from './util/database.js';  

const port = 3000;
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log(`Server running on ${port}`);
})

app.get('/users', async (req, res) => {
    const users = await dbAll("SELECT * FROM users");
    res.status(200).json(users);
})

app.get('/users/:id', async (req, res) => {
    const user = await dbGet("SELECT * FROM users WHERE id = ?;", [req.params.id]);
    
    if(!user){
        return res.status(400).json({message:"User not found"});    
    }

    res.status(200).json(user);
})

app.post("/users", async (req, res) => {
    const {name, age} = req.body;

    if(!name || !age){
        return res.status(404).json({message:"Fill all fields!"});
    }

    const result = await dbRun(`INSERT INTO users (name,age) VALUES (?, ?);`, [name, age]);
    res.status(201).json({id: result.lastID, name, id});
})

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await dbGet("SELECT * FROM users WHERE id = ?;", [req.params.id]);
    
    if(!user){
        return res.status(404).json({message:"User not found"});   
    }

    const {name, age} = req.body;
    if(!name || !age){
        return res.status(404).json({message:"Missing data!"});
    }
    dbRun("UPDATE users SET name = ?, age = ? WHERE id = ?", [name, age, id])
    res.status(200).json(user);
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await dbGet("SELECT * FROM users WHERE id = ?;", [req.params.id]);
    
    if(!user){
        return res.status(404).json({message:"User not found"});   
    }

    dbRun("DELETE FROM users WHERE id = ?", [id])
    res.status(200).json({message:"Delete successful"});
})

//HAS TO BE LAST
app.use((req, res, next, err) => {
    if(err){
        res.status(500).json({message:err})
    }
})

async function startServer(){
    await initializeDatabase();
    app.listen(3000, () => {
        console.log(`Server running on ${port}`);
    });
}

startServer();