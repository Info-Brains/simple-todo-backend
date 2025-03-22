const { readFromJsonFile, writeToJsonFile } = require('./helper/file.helper');
const express = require('express');

const filePath = './data/todos.json';
const app = express();

// const todos = [
//     {id: 0, title: 'Learn Node.js', isCompleted: false},
//     {id: 1, title: 'Learn Express.js', isCompleted: false},
// ];
let todos = readFromJsonFile(filePath);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// save middleware
const save = (req, res) => {
    writeToJsonFile(filePath, todos);
}

// Todo app routes
// GET:     /todos          - Get all todos
// GET:     /todos/:id      - Get todo by id
// POST:    /todos         - Create a new todo
// PUT:     /todos/:id      - Update a todo by id
// DELETE:  /todos/:id   - Delete a todo by id

app.get('/todos', (req, res) => {
    return res.status(200).json({
        message: 'Fetched all todos successfully',
        data: todos
    })
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === parseInt(id));

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    return res.status(200).json({
        message: 'Fetched todo successfully',
        data: todo
    })
})

app.post('/todos', (req, res, next) => {
    const title = req.body.title;

    if (!title) return res.status(400).json({
        message: 'Title not found',
    });

    todos.push({
        id: todos.length + 1,
        title,
        isCompleted: false
    });

    res.status(201).json({
        message: 'Todo created successfully'
    })

    return next();
}, save)

app.put('/todos/:id', (req, res, next) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === parseInt(id));

    if (!todo) return res.status(404).json({
        message: 'Todo not found',
    })

    const {title, isCompleted} = req.body;

    if (!title && !isCompleted) return res.status(400).json({
        message: 'Title or isCompleted not found',
    });

    if (title) todo.title = title;
    if (isCompleted) todo.isCompleted = isCompleted;

    writeToJsonFile(filePath, todos);

    res.status(200).json({
        message: 'Todo updated successfully',
        data: todo
    })

    return next()
}, save)

app.delete('/todos/:id', (req, res, next) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if (todoIndex === -1) return res.status(404).json({
        message: 'Todo not found',
    })

    todos.splice(todoIndex, 1);

    writeToJsonFile(filePath, todos);

    res.status(200).json({
        message: 'Todo deleted successfully'
    })

    return next()
}, save)

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
