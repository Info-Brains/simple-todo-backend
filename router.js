const TodoController = require('./controllers/todo.controller');
const UserController = require('./controllers/user.controller');
const checkAuth = require('./middlewars/auth.mw');
const { Router } = require('express');

const router = Router();

router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.login);

router.get('/todos', checkAuth, TodoController.getTodos);
router.get('/todos/:id', checkAuth, TodoController.getTodoById);
router.post('/todos', checkAuth, TodoController.createTodo);
router.put('/todos/:id', checkAuth, TodoController.updateTodo);
router.delete('/todos/:id', checkAuth, TodoController.deleteTodo);

module.exports = router;
