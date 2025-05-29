import express from "express";
import path from "path";
import cors from "cors"
import { fileURLToPath } from "url";
import * as db from "./util/database.js";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

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

app.get("/blogs", (req, res) => {
  try {
    const blogs = db.getBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.get("/blogs/:id", (req, res) => {
  try {
    const blog = db.getBlog(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.post("/blogs", (req, res) => {
  try {
    const { userId, author, title, category, content, date, modifyDate } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ message: "Invalid inputs!" });
    }
    const savedBlog = db.saveBlog(userId, author, title, category, content, date, modifyDate);
    if (savedBlog.changes != 1) {
      return res.status(501).json({ message: "Blog save failed!" });
    }
    res.status(201).json({ id: savedBlog.lastInsertRowid, userId, author, title, category, content, date, modifyDate });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.put("/blogs/:id", (req, res) => {
  const id = req.params.id;
  try {
    const updatedBlog = db.updateBlog(id);
    
    if (updatedBlog.changes != 1) {
      return res.status(501).json({ message: "Blog update failed!" });
    }
    res.status(201).json({
      id: updatedBlog.lastInsertRowid,
      userId,
      author,
      title,
      category,
      content,
      date,
      modifyDate
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.delete('/blogs/:id', (req, res) => {
    try {
        const deletedBlog = db.deleteBlog(req.params.id);
        if (deletedBlog.changes != 1) {
          return res.status(501).json({ message: "Blog delete failed!" });
        }
        res.status(200).json({message: 'Delete successful!'});
    } catch (err) {
        res.status(500).json({message: `${err}`});
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