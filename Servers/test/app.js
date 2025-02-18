const express = require("express");

const app = express();
app.use(express.json())

app.get("/", (req, res) => {res.send("Hello")});

app.get("/index", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname});
});

app.get("/:parameter", (req, res) => {
    const param = req.params.parameter;
    console.log(param);
    res.send(param);
});

app.post("/", (res, req) => {
    const {name, age} = req.body;
    console.log(`Name: ${name}, age: ${age}`);
});