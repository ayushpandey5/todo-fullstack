const { Router } = require("express");
const userMiddleware = require("../middleware/userMiddleware.js");
const router = Router();
const { User } = require("../db/db.js");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await User.findOne({
            username: username,
        })
        if(user){
            return res.sendStatus(400).json({error: "User already exists"})
        }
        const newUser = new User ({
            username: username,
            password: password
        })
        await newUser.save();
    } catch (error) {
        return res.status(500).json({error: error})
    } 
})

router.post("/login", async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await User.findOne({
            username: username,
            password: password
        })
        if(user){
          const token = jwt.sign({ username }, JWT_SECRET);
          admin.token = token;
          await admin.save();
          res.status(201).json({ token: token });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error})
    }

});

module.exports = router