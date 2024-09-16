const express = require('express');
const path = require('path');
const todoRoutes = require('./src/routes/todoRoutes');
const sequelize = require('./src/config/db.config');
const migrateTasksData = require('./src/migration/migrate-tasks-data');

const app = express(); 

// Middleware
app.use(express.json());
app.use('/node_modules', express.static('node_modules'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory

// Routes
app.use('/tasks', todoRoutes);

// Sync database
sequelize.sync()
    .then(async () => {
        await migrateTasksData(); // Run migration script
    })
    .catch(err => {
        console.error("Error syncing database:", err);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});