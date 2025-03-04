import express from 'express';
import path from 'path';
import __dirname from "./util/rootpath.js";
import * as fileHandler from "./util/filehandler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/books', (req, res) => {
    const books = fileHandler.getData();
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const books = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id >= books.length){
        return res.json({});
    }

    res.json(books[id]);
});

app.post('/books', (req, res) => {
    const books = fileHandler.getData();
    const { author, title, year } = req.body;

    if( !author || !title || !year){
        return res.json({ message: "Missing some data"});
    }
    const newBook = { author, title, year };
    books.push(newBook);
    fileHandler.saveData(books);
    res.json(newBook);
});

app.put('/books/:id', (req, res) => {
    const books = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id >= books.length){
        return res.json({message: "Book not found"});
    }

    const { author, title, year } = req.body;
    books[id] = { author, title, year };
    fileHandler.saveData(books);
    res.json(books[id]);
});

app.delete('/books/:id', (req, res) => {
    const books = fileHandler.getData();
    const id = req.params.id;

    if(id < 0 || id >= books.length){
        return res.json({ message: "Book not found" });
    }

    books.splice(id, 1);
    fileHandler.saveData(books);
    res.json({ message: "Delete successful" });
});

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});