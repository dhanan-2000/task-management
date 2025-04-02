const { TaskModel } = require("../models");
const structuredResponse = require("../utils/response");

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new TaskModel({ user: req.user, title, description, status });

    await task.save();
    return structuredResponse(res, 201, true, "Task created successfully", task);
  } catch (error) {
    console.error(error);
    return structuredResponse(res, 500, false, "Server error", null, error.message);
  }
};


const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ user: req.user });
    return structuredResponse(res, 200, true, "Tasks retrieved successfully", tasks);
  } catch (error) {
    console.error(error);
    return structuredResponse(res, 500, false, "Server error", null, error.message);
  }
};


const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    let task = await TaskModel.findOne({ _id: req.params.id, user: req.user });

    if (!task) return structuredResponse(res, 404, false, "Task not found");

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    return structuredResponse(res, 200, true, "Task updated successfully", task);
  } catch (error) {
    console.error(error);
    return structuredResponse(res, 500, false, "Server error", null, error.message);
  }
};


const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findOneAndDelete({ _id: req.params.id, user: req.user });

    if (!task) return structuredResponse(res, 404, false, "Task not found");

    return structuredResponse(res, 200, true, "Task deleted successfully");
  } catch (error) {
    console.error(error);
    return structuredResponse(res, 500, false, "Server error", null, error.message);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
