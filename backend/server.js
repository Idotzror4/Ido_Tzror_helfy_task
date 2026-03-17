const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

let tasks = [];
let nextId = 1;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Manager API is running'); 
});

app.get('/api/tasks', (req, res) => {
    res.status(200).json(tasks); 
});

app.post('/api/tasks', (req, res) => {
    const { title, description, priority } = req.body;
    const allowedPriorities = ['low', 'medium', 'high'];

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    if (!priority || !allowedPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    const newTask = {
        id: nextId++,
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: false,
        createdAt: new Date().toISOString(),
        priority
    };
    tasks.push(newTask);
    res.status(201).json(newTask); 
});
    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});