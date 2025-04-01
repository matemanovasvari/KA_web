import express from 'express';
import { dbAll, initializeDatabase, dbGet, dbRun } from './util/database.js';  

const port = 3000;
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log(`Server running on ${port}`);
})

app.get('/wizards', async (req, res) => {
    const wizards = await dbAll("SELECT * FROM wizards");
    res.status(200).json(wizards);
})

app.get('/wizards/:id', async (req, res) => {
    const wizard = await dbGet("SELECT * FROM wizards WHERE id = ?;", [req.params.id]);
    
    if(!wizard){
        return res.status(400).json({message:"Wizard not found"});    
    }

    res.status(200).json(wizard);
})

app.post("/wizards", async (req, res) => {
    const {name, magic_wand, house_name} = req.body;

    if(!name || !magic_wand || !house_name){
        return res.status(404).json({message:"Missing data!"});
    }

    const result = await dbRun(`INSERT INTO wizards (name, magic_wand, house_name) VALUES (?, ?, ?);`, [name, magic_wand, house_name]);
    res.status(201).json({id: result.lastID, name, magic_wand, house_name});
})

app.put('/wizards/:id', async (req, res) => {
    const id = req.params.id;
    const wizard = await dbGet("SELECT * FROM wizards WHERE id = ?;", [id]);
    
    if(!wizard){
        return res.status(404).json({message:"wizard not found"});   
    }

    const {name, magic_wand, house_name} = req.body;
    if(!name || !magic_wand || !house_name){
        return res.status(404).json({message:"Missing data!"});
    }
    dbRun("UPDATE wizards SET name = ?, magic_wand = ?, house_name = ? WHERE id = ?", [name, magic_wand, house_name, id])
    res.status(200).json(wizard);
})

app.delete('/wizards/:id', async (req, res) => {
    const id = req.params.id;
    const wizard = await dbGet("SELECT * FROM wizards WHERE id = ?;", [id]);
    
    if(!wizard){
        return res.status(404).json({message:"Wizard not found"});   
    }

    dbRun("DELETE FROM wizards WHERE id = ?", [id])
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