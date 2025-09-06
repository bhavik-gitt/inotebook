const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'bhavik$9999';
// create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 8 }),
], async (req, res) => {
  
        // IF there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
        // check if user already exists with this email
        let user1 = await User.findOne({ email: req.body.email });
        if (user1) {
            return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        // create new user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        console.log(authToken);
        // send success response
        res.json({authToken});
        
        // catch errors 
        } catch(error){
            console.log(error.message);
            res.status(500).send("Some error occured");
        }

    } 
);

// Authenticate a user using : POST "/api/auth/login". no login required 
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 8 }),
], async (req, res) => {
});

module.exports = router;
