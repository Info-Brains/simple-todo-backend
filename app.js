const express = require('express');
const router = require('./router');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/health', (req, res) => {
    console.log('Health check route hit');
    return res.status(200).json({ status: 'UP' })
})

app.use('/error', (req, res) => {
    console.error('Error route hit');
    return res.status(500).json({ status: 'Error' })
})

app.use(router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
