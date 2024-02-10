const jsonwebtoken = require("jsonwebtoken")
const constants = require("../utils/constants")

function userMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedToken = jsonwebtoken.verify(token, constants.JWT_SECRET)
        if(decodedToken.username){
            next()
        }else{
            return res.status(403).json({error: "Not Authenticated"})
        }

    } catch (error) {
        return res.status(500).json({error: error})
    }
}