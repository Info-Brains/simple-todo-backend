const { readFromJsonFile, writeToJsonFile } = require('./helper/file.helper');
const TodoController = require('./controllers/todo.controller');
const { Router } = require('express');

const router = Router();

router.get('/todos', TodoController.getTodos);
router.get('/todos/:id', TodoController.getTodoById);
router.post('/todos', TodoController.createTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;
