const TodoDBModel = require('../models/todo.db.model');

const getTodos = async (req, res) => {
    const userId = req.user.id;

    return res.status(200).json({
        message: 'Fetched all todos successfully',
        data: await TodoDBModel.getAll({
            userId: userId
        })
    })
}

const getTodoById = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    const todo = await TodoDBModel.findOne({id, userId});

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    return res.status(200).json({
        message: 'Fetched todo successfully',
        data: todo
    })
}

const createTodo = async (req, res) => {
    const title = req.body.title;
    const userId = req.user.id;

    if (!title) return res.status(400).json({
        message: 'Title not found',
    });

    await TodoDBModel.createOne({
        userId: userId,
        title: title,
    })

    res.status(201).json({
        message: 'Todo created successfully'
    })
}

const updateTodo = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    const todo = await TodoDBModel.findOne({id, userId});

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    const {title, isCompleted} = req.body;

    if (!title && !isCompleted) return res.status(400).json({
        message: 'Title or isCompleted not found',
    });

    const updatedTodo = await TodoDBModel.updateOne(id, userId, {
        ...(title ? { title: title } : {}),
        ...(isCompleted ? { isCompleted: isCompleted } : {}),
    })

    res.status(200).json({
        message: 'Todo updated successfully',
        data: updatedTodo
    })
}

const deleteTodo = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    const todo = await TodoDBModel.findOne({id, userId});

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    await TodoDBModel.deleteOne({id, userId})

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
