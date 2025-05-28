import express from "express";
import path from "path";
import cors from "cors"
import { fileURLToPath } from "url";
import * as db from "./util/database.js";

const PORT = 3000;
const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("./public/htmls/index.html", { root: __dirname });
});

app.get('/users', (req, res) => {
    try{
        const users = db.getUsers();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json({message: `${err}`})
    }           
});

app.get('/users/:id', (req, res) => {
    try{
        const user = db.getUser(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found!'});
        }
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.post('/users', (req, res) => {
    try {
        const { email, username, password} = req.body;
        if(!email || !username || !password){
            return res.status(400).json({message: 'Invalid credentials!'});
        }
        const savedUser = db.saveUser(email, username, password);
        if(savedUser.changes != 1){
            return res.status(501).json({message: 'User save failed!'});
        }
        res.status(201).json({ id: savedUser.lastInsertRowid, email, username, password });
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (err.message.includes("users.email")) {
          return res.status(409).json({ message: "Email already exists." });
        }
        if (err.message.includes("users.username")) {
          return res.status(409).json({ message: "Username already exists." });
        }
        if (err.message.includes("users.password")) {
          return res.status(409).json({ message: "Password already in use." });
        }
        return res.status(409).json({ message: "A unique constraint was violated." });
      }
      res.status(500).json({ message: "Internal server error." });
    }
});

async function startServer() {
  app.listen(3000, () => {
    console.log(`Server running on ${PORT}`);
  });
}

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: err });
  }
});

startServer();