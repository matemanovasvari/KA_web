import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, username TEXT UNIQUE, password TEXT UNIQUE)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, author TEXT, title TEXT, category TEXT, content TEXT, date TEXT, modifyDate TEXT, FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE )`).run();

export const getUsers = () => db.prepare("SELECT * FROM users").all();

export const getUser = (id) => db.prepare("SELECT * FROM users WHERE id = ?").get(id);

export const saveUser = (email, username, password) => db.prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)").run(email, username, password);

export const updateUser = (email, username, password) => db.prepare("UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?").run(email, username, password);

export const deleteUser = (id) => db.prepare("DELETE FROM users WHERE id =?").run(id);

export const getBlogs = () => db.prepare("SELECT * FROM blogs").all();

export const getBlog = (id) => db.prepare("SELECT * FROM blogs WHERE id = ?").get(id);

export const saveBlog = (userId, author, title, category, content, date, modifyDate) =>
    db.prepare("INSERT INTO blogs (userId, author, title, category, content, date, modifyDate) VALUES (?,?,?,?,?,?,?)")
      .run(userId, author, title, category, content, date, modifyDate);

export const updateBlog = (id, userId, title, category, content, date, modifyDate) => 
    db.prepare("UPDATE blogs SET userId = ?, title = ?, category = ?, content = ?, date = ?, modifyDate = ? WHERE id = ?")
      .run(userId, title, category, content, date, modifyDate, id);

export const deleteBlog = (id) => db.prepare("DELETE FROM blogs WHERE id =?").run(id);