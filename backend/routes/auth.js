const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "bhavik$9999";
const fetchuser = require("../middleware/fetchuser");
// ROUTE 1  -  create a user using : POST "/api/auth/createuser". No login required
router.post(
    "/createuser",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter valid email").isEmail(),
        body("password", "Enter valid password").isLength({ min: 8 }),
    ],
    async (req, res) => {
        // IF there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // check if user already exists with this email
            let user1 = await User.findOne({ email: req.body.email });
            if (user1) {
                return res
                    .status(400)
                    .json({ error: "Sorry, a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            // create new user
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken);
            // send success response
            res.json({ authToken });

            // catch errors
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error occured");
        }
    }
);

// ROUTE 2  -  Authenticate a user using : POST "/api/auth/login". no login required
router.post(
    "/login",
    [
        body("email", "Enter valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ errors: erros.array() });
        }
        const { email, password } = req.body; //destructuring
        try {
            const user = await User.findOne({ email });
            if (!user) { //if user with given email does not exist
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            const data = {  //fetching user id to create auth token 
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET); //generating auth token
            return res.json({ authToken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error occured");
        }
    }
);
// ROUTE 3  -  Get loggedin use details using : POST "/api/auth/getuser". login required
router.post("/getuser",fetchuser,async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error occured");
        }
    });
module.exports = router;
