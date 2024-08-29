// controllers/taskController.js
const OrganizedTask = require('../models/organizedTask');
const PriorityTask = require('../models/priorityTask');
const DailyTask = require('../models/dailyTask');
const WeeklyTask = require('../models/weeklyTask');
const MonthlyTask = require('../models/monthlyTask');

// Get all Daily Tasks
exports.getAllDailyTasks = async (req, res) => {
  try {
    const tasks = await DailyTask.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Daily Task
exports.createDailyTask = async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = await DailyTask.create({ text });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Daily Task
exports.updateDailyTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const updatedTask = await DailyTask.findByIdAndUpdate(id, { text }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Daily Task
exports.deleteDailyTask = async (req, res) => {
  try {
    const { id } = req.params;
    await DailyTask.findByIdAndDelete(id);
    res.json({ message: 'Daily task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Weekly Tasks
exports.getAllWeeklyTasks = async (req, res) => {
  try {
    const tasks = await WeeklyTask.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Weekly Task
exports.createWeeklyTask = async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = await WeeklyTask.create({ text });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Weekly Task
exports.updateWeeklyTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const updatedTask = await WeeklyTask.findByIdAndUpdate(id, { text }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Weekly Task
exports.deleteWeeklyTask = async (req, res) => {
  try {
    const { id } = req.params;
    await WeeklyTask.findByIdAndDelete(id);
    res.json({ message: 'Weekly task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Monthly Tasks
exports.getAllMonthlyTasks = async (req, res) => {
  try {
    const tasks = await MonthlyTask.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Monthly Task
exports.createMonthlyTask = async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = await MonthlyTask.create({ text });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Monthly Task
exports.updateMonthlyTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const updatedTask = await MonthlyTask.findByIdAndUpdate(id, { text }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Monthly Task
exports.deleteMonthlyTask = async (req, res) => {
  try {
    const { id } = req.params;
    await MonthlyTask.findByIdAndDelete(id);
    res.json({ message: 'Monthly task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Fetch all Priority Tasks
exports.getPriorityTasks = async (req, res) => {
  try {
    const tasks = await PriorityTask.find({});
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Priority Task
exports.createPriorityTask = async (req, res) => {
  try {
    const { text, level } = req.body;
    const newTask = await PriorityTask.create({ text, level });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Priority Task
exports.updatePriorityTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, level } = req.body;
    const updatedTask = await PriorityTask.findByIdAndUpdate(id, { text, level }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Priority Task
exports.deletePriorityTask = async (req, res) => {
  try {
    const { id } = req.params;
    await PriorityTask.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Fetch all Organized Tasks
exports.getOrganizedTasks = async (req, res) => {
  try {
    const tasks = await OrganizedTask.find({});
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Organized Task
exports.createOrganizedTask = async (req, res) => {
  try {
    const { text, category } = req.body;
    const newTask = await OrganizedTask.create({ text, category });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Organized Task
exports.updateOrganizedTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, category } = req.body;
    const updatedTask = await OrganizedTask.findByIdAndUpdate(id, { text, category }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Organized Task
exports.deleteOrganizedTask = async (req, res) => {
  try {
    const { id } = req.params;
    await OrganizedTask.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};