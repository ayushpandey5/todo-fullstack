const {Router} = require("express")
const userMiddleware = require("../middleware/userMiddleware")
const router = Router()
const {Todo} = require("../db/db")
const {createTodo, updateTodo} = require("../utils/types")

router.post("/todo", async(req,res) => {
    const payload = req.body
    const parsedPayload = createTodo.safeParse(payload)
    if(!parsedPayload.success){
        return res.status(411).json({error: "Bad request inputs"})
    }
    const todo = new Todo(parsedPayload.data);
    await todo.save();
    return res.status(200).json({success : `${parsedPayload}`})

})

router.get("/todos", async(req, res) => {
    const todos = await Todo.find({})
    return res.status(200).json({ data: todos})
})

router.put("/completed", async (req, res) =>{
    const payload = req.body
    const parsedPayload = updateTodo.safeParse(payload)
    if(!parsedPayload.success){
        return res.status(401).json({error: "Bad request input"})
    }
    const todo = await Todo.updateOne({ _id: parsedPayload.data.id}, {
        isComplete: true
    })
})

module.exports = router;
