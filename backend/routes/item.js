const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/todos", (req, res, next) => {
    // This will return all the data, exposing only the id and action field to the client
    Todo.find({}, "action")
        .then((data) => res.json(data))
        .catch(next);
});

router.post("/todos", async (req, res, next) => {
    if (req.body.action) {
        // console.log(req.body);
        const item = new Todo(req.body);
        await item.save();
        return res.send("Success");
    } else {
        res.json({
            error: "The input field is empty",
        });
    }
});

router.delete("/todos/:id", async (req, res, next) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    res.send("Delete Success");
});

module.exports = router;
