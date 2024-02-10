const express = require("express")
const cors = require("cors")
const constants = require("./utils/constants.js")
const app = express()
const todoRouter = require("./routes/todoRoutes.js")
const userRouter = require("./routes/userRoutes.js")

app.use(cors())
app.use(express.json())

app.use("/user", userRouter);
app.use("todo", todoRouter);

app.listen(constants.PORT, () => {
    console.log(`Server's Listening in port ${constants.PORT}`)
})



