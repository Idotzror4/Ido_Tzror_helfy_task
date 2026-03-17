const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

let tasks = [];
let nextId = 1;
const allowedPriorities = ['low', 'medium', 'high'];

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

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    if (!priority || !allowedPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }
    
    task.title = title.trim();
    task.description = description ? description.trim() : '';
    task.priority = priority;
    task.completed = Boolean(completed);
    
    res.status(200).json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(200).json({ message: `Task ${id} successfully deleted` });
});

app.patch('/api/tasks/:id/toggle', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    task.completed = !task.completed;
    res.status(200).json(task);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});