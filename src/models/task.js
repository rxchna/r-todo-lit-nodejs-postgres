const { Datatypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    assignedTo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        allowNull: false
    }
});

module.exports = Task;