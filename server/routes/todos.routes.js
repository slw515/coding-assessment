const express = require("express");
const todo_controller = require("../controllers/todos.controllers");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log('hit!')
        const controllerResponse = await todo_controller.getTodos();
        console.log(controllerResponse)
        res.status(200).send(controllerResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }

    // todo_controller
    // .getTodos()
    // .then((response) => {
    //   res.status(200).send(response);
    // })
    // .catch((error) => {
    //   res.status(500).send(error);
    // });
});

router.post('/', async (req, res) => {
    try {
        const controllerResponse = await todo_controller.createTodo(req.body);
        res.status(200).send(controllerResponse);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { todoID } = req.body;
        const controllerResponse = await todo_controller.updateTodo(todoID);
        res.status(200).send(controllerResponse);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { todoID } = req.body;
        const controllerResponse = await todo_controller.deleteTodo(todoID);
        res.status(200).send(controllerResponse);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;