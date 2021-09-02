// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Port listener
const PORT = process.env.PORT || 3001;

// Creates express app
const app = express();

// Middleware for parsing, json, static
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    let savedNote = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(savedNote);
});

app.get('/api/notes/:id', (req, res) => {
    res.json(savedNote[Number(req.params.id)]);
});

app.post('/api/notes', (req, res) => {
    let savedNote = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    let newNote = req.body;
    let uniqueID = (savedNote.length).toString();
    newNote.id = uniqueID;
    savedNote.push(newNote);

    fs.writeFileSync('db/db.json', JSON.stringify(savedNote));
    res.json(savedNote);
});

app.delete('/api/notes/:id', (req, res) => {
    let savedNote = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    let noteId = req.params.id;
    let newId = 0; 
    savedNote = savedNote.filter(currentNote => {
        return currentNote.id != noteId;
    });
    for (currentNote of savedNote) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync('db/db.json', JSON.stringify(savedNote));
    res.json(savedNote);
});

// Listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
