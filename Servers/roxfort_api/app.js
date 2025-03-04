import express from 'express';
import path from 'path';
import __dirname from "./util/rootpath.js";
import * as fileHandler from "./util/filehandler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/roxforts', (req, res) => {
    const roxforts = fileHandler.getData();
    res.json(roxforts);
});

app.get('/roxforts/:id', (req, res) => {
    const roxforts = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id >= roxforts.length){
        return res.json({});
    }

    res.json(roxforts[id]);
});

app.post('/roxforts', (req, res) => {
    const roxforts = fileHandler.getData();
    const { name, magic_wand, house } = req.body;

    if( !name || !magic_wand || !house){
        return res.json({ message: "Missing some data"});
    }
    const newRoxfort = { name, magic_wand, house };
    roxforts.push(newRoxfort);
    fileHandler.saveData(roxforts);
    res.json(newRoxfort);
});

app.put('/roxforts/:id', (req, res) => {
    const roxforts = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id >= roxforts.length){
        return res.json({message: "Wizard not found"});
    }

    const { name, magic_wand, house } = req.body;
    roxforts[id] = { name, magic_wand, house };
    fileHandler.saveData(roxforts);
    res.json(roxforts[id]);
});

app.delete('/roxforts/:id', (req, res) => {
    const roxforts = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id >= roxforts.length){
        return res.json({ message: "Wizard not found" });
    }

    roxforts.splice(id, 1);
    fileHandler.saveData(roxforts);
    res.json({ message: "Delete successful" });
});

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});