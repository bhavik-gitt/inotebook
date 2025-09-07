const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { validationResult, body } = require("express-validator");

// ROUTE 1 - Get all the Notes using : GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const userNotes = await Note.find({ user: req.user.id });
        res.json({Notes :userNotes});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2 - Add new Notes using : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid tittle').isLength({min : 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min : 5})
], async (req, res) => {

    try {
     const {title, description, tag} = req.body;
     // IF there are errors, return bad request and errors    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        // const userNotes = await Notes.find({ user: req.user.id });
        res.json(savedNote);
    } catch(error) {
        console.error(error.message); 
        res.status(500).send("Internal Server Error"); 
    }

});

module.exports = router;
