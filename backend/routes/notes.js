const express = require('express');
const notes = express.Router();

notes.get('/',(rep,res)=>
{
   
    res.json([]);
})

module.exports = notes