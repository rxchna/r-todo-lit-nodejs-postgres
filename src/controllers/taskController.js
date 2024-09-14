const Task = require('../models/task'); // Import Sequelize Task model

// Get all tasks
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll();  // Retrieve all tasks from db
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

// Create new task
const createTask = async (req, res, next) => {
    try {
        const { title, description, assignedTo, dueDate, priority, status } = req.body;

        if (!title || !description || !assignedTo || !dueDate || !priority || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newTask = await Task.create({ title, description, assignedTo, dueDate, priority, status });
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

// Get single task by ID
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);  // Find task by ID
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        next(err);
    }
};

// Update task by ID
const updateTaskById = async (req, res, next) => {
    try {
        const { title, description, assignedTo, dueDate, priority, status } = req.body;
        const task = await Task.findByPk(req.params.id);

        if (task) {
            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (assignedTo !== undefined) task.assignedTo = assignedTo;
            if (dueDate !== undefined) task.dueDate = dueDate;
            if (priority !== undefined) task.priority = priority;
            if (status !== undefined) task.status = status;

            await task.save();  // Save updated task to db
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        next(err);
    }
};

// Delete task by ID
const deleteTaskById = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (task) {
            await task.destroy();  // Delete task
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById };
