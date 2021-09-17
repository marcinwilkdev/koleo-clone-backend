import express from "express";

const app = express();

app.get("/", (req, res, next) => {
    res.send("HELLO WORLD!");
});

app.listen(8080);
