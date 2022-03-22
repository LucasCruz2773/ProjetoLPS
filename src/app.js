const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({msg: "Hello World"});
})

app.post("/sum", (req, res) => {
    try{
        const { a, b } = req.body;
        res.status(200).send({result: a + b });
    } catch(err) {
        return res.status(400).send({message: err});
    }
})

module.exports = app;

