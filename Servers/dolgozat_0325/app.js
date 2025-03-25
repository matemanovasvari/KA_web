import express from "express";
import path from "path";
import __dirname from "./util/rootpath.js";
import * as fileHandler from "./util/fileHandler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/movies", (req, res) => {
    const movies = fileHandler.getData();
    res.json(movies);
});

app.get("/movies/:id", (req, res) => {
    const movies = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id > movies.length){
        return res.json({});
    }

    res.json(movies[id]);
});

app.post("/movies", (req, res) => {
    const movies = fileHandler.getData();
    const {title, director, releaseYear, oscar} = req.body;

    if(!title || !director || !releaseYear || !oscar){
        return res.json({message: "Missing data"});
    }

    const newMovie = {title, director, releaseYear, oscar};
    movies.push(newMovie);
    fileHandler.writeData(movies);
    res.json(newMovie);
});

app.put("/movies/:id", (req, res) => {
    const movies = fileHandler.getData();
    const id = req.params.id;
 

    if(id < 0 || id > movies.length){
        return res.json({message: "Movie not found"});
    }

    const {title, director, releaseYear, oscar} = req.body; 
    roxforts[id] = {title, director, releaseYear, oscar};
    fileHandler.writeData(movies);
    res.json(movies[id]);
});

app.delete('/movies/:id', (req, res) => {
    const movies = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id >= movies.length){
        return res.json({message: "Movie not found"});
    }

    roxforts.splice(id, 1);
    fileHandler.saveData(movies);
    res.json({ message:"Delete successful"});
});

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});