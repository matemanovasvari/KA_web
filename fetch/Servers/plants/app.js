const express = require("express");

const app = express();
app.use(express.json());

const port = 3010;

const flowers = [
    {"name"}
]

app.listen(port, () => {console.log(`Server started on port: ${port}`)});

app.get('/', (req, res) => {res.sendFile("./views/novenyek.html", {root: __dirname})})

app.get("/flowers", (req, res) => {
    res.send(flowers);
});