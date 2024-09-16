const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Task = require('../models/task.model');

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

async function migrateInitialData() {
    try {
        // Ensure the table is created
        await sequelize.sync();

        // Check if there's already data in the table
        const count = await Task.count();
        if (count === 0) {
        // Insert initial data
        await Task.bulkCreate(initialData);
        console.log("Initial data inserted successfully");
        } else {
        console.log("Data already exists, skipping initial data insertion");
        }
    } catch (error) {
        console.error("Error migrating initial data:", error);
    }
}

// Export the function so it can be used elsewhere
module.exports = migrateInitialData;
