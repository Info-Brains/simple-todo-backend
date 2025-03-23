const {readFromJsonFile, writeToJsonFile} = require("../helper/file.helper");
const TodoModel = require('../models/todo.model');

let todos = new TodoModel();

const getTodos = (req, res) => {
    return res.status(200).json({
        message: 'Fetched all todos successfully',
        data: todos.getAll()
    })
}

const getTodoById = (req, res) => {
    const id = req.params.id;
    const todo = todos.findOne(id);

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    return res.status(200).json({
        message: 'Fetched todo successfully',
        data: todo
    })
}

const createTodo = (req, res) => {
    const title = req.body.title;

    if (!title) return res.status(400).json({
        message: 'Title not found',
    });

    todos.createOne({
        title: title,
        isCompleted: false
    })

    res.status(201).json({
        message: 'Todo created successfully'
    })
}

const updateTodo = (req, res) => {
    const id = req.params.id;
    const todo = todos.findOne(id);

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    const {title, isCompleted} = req.body;

    if (!title && !isCompleted) return res.status(400).json({
        message: 'Title or isCompleted not found',
    });

    todos.updateOne(id, {
        ...(title ? { title: title } : {}),
        ...(isCompleted ? { isCompleted: isCompleted } : {}),
    })

    res.status(200).json({
        message: 'Todo updated successfully',
        data: todo
    })
}

const deleteTodo = (req, res) => {
    const id = req.params.id;
    const todo = todos.findOne(id);

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    todos.deleteOne(id)

    res.status(200).json({
        message: 'Todo deleted successfully'
    })
}

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
}
