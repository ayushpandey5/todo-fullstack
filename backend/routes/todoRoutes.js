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
    return res.status(200).json({success : "Todo created Successfully"})
})

router.get("/todos", async(req, res) => {
    const todos = await Todo.find({  })
    return res.status(200).json({ success: 200 ,data: todos})
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
    return res.status(200).json({data: todo})
})

router.delete("/todo", async (req, res) => {
    const id = req.body.id
    try {
        await Todo.findOneAndDelete({ _id: id })
    } catch (error) {
        return res.status(500).json({error: error})
    }
    return res.status(200).json({success: "Todo deleted"})

})

module.exports = router;
