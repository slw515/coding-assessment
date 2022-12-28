const express = require("express");
const todo_controller = require("../controllers/todos.controllers");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const controllerResponse = await todo_controller.getTodos();
    res.status(200).send(controllerResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const controllerResponse = await todo_controller.createTodo(req.body);
    res.status(200).send(controllerResponse);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const controllerResponse = await todo_controller.updateTodo(req.body);
    res.status(200).send(controllerResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const controllerResponse = await todo_controller.deleteTodo(todoId);
    res.status(200).send(controllerResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
