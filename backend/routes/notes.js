const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { validationResult, body } = require("express-validator");

// ROUTE 1 - Get all the Notes using : GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const userNotes = await Note.find({ user: req.user.id });
        res.json( userNotes );
    } catch (error) { 
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2 - Add new Notes using : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid tittle').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // IF there are errors, return bad request and errors    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 3 - Update an existing Notes using : PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // 2. Find the note by ID
        const note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow update only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        const updatenote = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true } // correct option key is "new"
        );
        res.json({ updatenote });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4 - Delete an existing Notes using : DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // 2. Find the note by ID
        const note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        const deletenote = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", deletenote: deletenote });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
