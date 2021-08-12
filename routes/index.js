const router = require('express').Router();
const { json } = require('express');
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    const database = JSON.parse(fs.readFileSync('db/db.json'));

    res.json(database);
})

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    const database = JSON.parse(fs.readFileSync('db/db.json'));

    database.push(newNote);

    fs.writeFileSync('db/db.json', JSON.stringify(database));

    res.json(database);
})

router.delete('/notes/:id', (req, res) => {
    const database = JSON.parse(fs.readFileSync('db/db.json'));
    
    const id = req.params.id;

    const deleteNote = database.filter(entry => (entry.id !== id));

    fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));

    res.json(database);
})

module.exports = router;