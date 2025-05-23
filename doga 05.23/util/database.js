import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT)`).run()


export const getBooks = () => db
    .prepare('SELECT * FROM books').all()

export const getBook = (id) => db
    .prepare('SELECT * FROM books WHERE id =?').get(id)

export const saveBook = (title, author) => db
    .prepare('INSERT INTO books (title, author) VALUES (?,?)').run(title, author)

export const updateBook = (id, title, author) => db
    .prepare('UPDATE books SET title = ?, author = ? WHERE id = ?').run(title, author, id)

export const deleteBook = (id) => db
    .prepare('DELETE FROM books WHERE id = ?').run(id)