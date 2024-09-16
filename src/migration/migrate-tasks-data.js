const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Task = require('../models/task');

// Initial data
const initialData = [
    {
        title: "test",
        description: "testing",
        assignedTo: "rachna",
        dueDate: "2024-08-08",
        priority: "Medium",
        status: "Pending"
    },
    {
        title: "Task 1: Clean bedroom",
        description: "mop",
        assignedTo: "Rachna",
        dueDate: "2024-08-13",
        priority: "High",
        status: "In Progress"
    },
    {
        title: "Task 2: Grocery",
        description: "sugar, tea",
        assignedTo: "Rachna",
        dueDate: "2024-08-17",
        priority: "Low",
        status: "Pending"
    },
    {
        title: "shravan",
        description: "ssd",
        assignedTo: "rachna",
        dueDate: "2024-09-10",
        priority: "High",
        status: "Pending"
    }
];

async function migrateTasksData() {
    try {
        // Ensure table is created
        await sequelize.sync();

        // Migrate if table count == 0
        const count = await Task.count();
        if (count == 0) {
            // Insert initial data
            await Task.bulkCreate(initialData);
            console.log("Initial data inserted successfully");
        }
    } catch (error) {
        console.error("Error migrating initial data:", error);
    }
}

module.exports = migrateTasksData;