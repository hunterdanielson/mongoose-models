const express = require('express');
const app = express();
const Meme = require('./models/Meme');

app.use(require('cors')());
app.use(express.json());

app.post('/memes', (req, res) => {
    Meme
        .create(req.body)
        .then(meme => res.send(meme));
});

app.get('/memes', (req, res) => {
    Meme
        .find()
        .then(meme => res.send(meme));
});

app.get('/memes/:id', (req, res) => {
    Meme
        .findById(req.params.id)
        .then(meme => res.send(meme));
});

app.patch('/meme')

module.exports = app;
