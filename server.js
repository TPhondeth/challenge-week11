// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();


// Sets up the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public.index.html'));
});

// API Routes
app.get('api/notes', (req, res) => {
    res.json(notes.slice(1));
});

app.post('api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

// Function to create new note
const createNewNote(body, notesArray) => {
    const newNote = body;
    
}

// Listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
