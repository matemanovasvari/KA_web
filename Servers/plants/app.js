const express = require("express");

const app = express();
app.use(express.json());

const port = 3010;

const flowers = [
    {"name": "rózsa", "category": "évelő"},
    {"name": "tulipán", "category": "hagymás"}
];

const trees = [
    {"name": "tuja", "category": "örökzöld"},
    {"name": "nyír", "category": "fa"}
];

app.listen(port, () => {console.log(`Server started on port: ${port}`)});

app.get('/', (req, res) => {
    res.sendFile("./views/novenyek.html", {root: __dirname})
});

app.get("/flowers", (req, res) => {
    res.send(flowers);
});

app.get("/trees", (req, res) => {
    res.send(trees);
});

app.get('/404', (req, res) => {
    res.sendFile("./views/404.html", {root: __dirname});
});

app.get("/plants/:parameter", (req, res) => {
    const param = req.params.parameter;
    console.log(param);
    if(param == "flowers"){
        res.send(flowers);
    }
    else if(param == "trees"){
        res.send(trees);
    }
    else{
        res.sendFile("./views/404.html", {root: __dirname});
    }
});