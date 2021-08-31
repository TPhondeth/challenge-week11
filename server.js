// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Port listener
const PORT = process.env.PORT || 3001;

// Creates server
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public.index.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(savedNotes[Number(req.params.id)]);
});

// Listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
