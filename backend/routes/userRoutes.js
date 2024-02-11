const { Router } = require("express");
const {userMiddleware} = require("../middleware/userMiddleware");
const router = Router();
const { User } = require("../db/db.js");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants.js")
const {createUser} = require("../utils/types.js")

router.post("/signup", async (req,res) => {
    const payload = req.body
    const parsedPayload = createUser.safeParse(payload)
    console.log(parsedPayload.data)
    try {
        const user = await User.findOne({
            username: parsedPayload.data.username,
        })
        if(user){
            return res.status(400).json({error: "User already exists"})
        }
        const newUser = new User ({
            username: parsedPayload.data.username,
            password: parsedPayload.data.password
        })
        await newUser.save();
        return res.status(200).json({success: "User created"})
    } catch (error) {
        return res.status(500).json({error: error})
    } 
})

router.post("/login", async (req,res) => {
    const payload = req.body
    const parsedPayload = createUser.safeParse(payload)
    console.log(parsedPayload.data)
    try {
        const user = await User.findOne({
            username: parsedPayload.data.username,
            password: parsedPayload.data.password
        })
        if(user){
          const token = jwt.sign({ username: parsedPayload.data.username }, constants.JWT_SECRET);
          user.token = token;
          await user.save();
          return res.status(201).json({ token: token });
        }
        return res.status(401).json({error: "Username or password wrong or not found"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error})
    }

});

module.exports = router