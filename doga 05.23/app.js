import express from 'express';
import * as db from './util/database.js';

const PORT = 8080;
const app = express();
app.use(express.json());

app.get("/books", (req, res) => {
    try{
        const books = db.getBooks();
        res.status(200).json(books);
    } catch(err){
        res.status(404).json({message: `${err}`});
    }
});

app.get("/books/:id", (req, res) => {
    try{
        const book = db.getBook();
        if(!book){
            return res.status(404).json({message: "Book not found!"})
        }
        res.status(200).json(book);
    } catch(err){
        res.status(500).json({message:`${err}`});
    }
});

app.post('/books', (req, res) => {
    try {
        const {title, author} = req.body;
        if(!title || !author){
            return res.status(404).json({message: 'Missing data!'});
        }
        const savedBook = db.saveBook(title, author);
        if(savedBook.changes != 1){
            return res.status(500).json({message: 'Book save failed!'});
        }
        res.status(201).json({id: savedBook.lastInsertRowid});
    } catch (err) {
        res.status(500).json({message: `${err}`});
    }
});

app.delete('/books/:id', (req, res) => {
    try {
        const deletedBook = db.deleteBook(req.params.id);
        if(deletedBook.changes != 1){
            return res.status(404).json({message: 'Book delete failed!'});
        }
        res.status(204);
    } catch (err) {
        res.status(500).json({message: `${err}`});
    }
});

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});