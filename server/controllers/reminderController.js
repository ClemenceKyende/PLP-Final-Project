const Reminder = require('../models/reminderModel');
const mongoose = require('mongoose');

// Function to create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { text, datetime, user_id } = req.body;
    
    // Validate required fields
    if (!text || !datetime || !user_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new reminder
    const newReminder = await Reminder.create({ text, datetime, user_id });
    
    res.status(201).json(newReminder); // Respond with created reminder
  } catch (error) {
    console.error('Error creating reminder:', error.message);
    res.status(400).json({ message: error.message }); // Handle error
  }
};

// Function to get all reminders for a user
exports.getAllReminders = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Find all reminders for the specified user
    const reminders = await Reminder.find({ user_id });
    
    res.json(reminders); // Respond with reminders
  } catch (error) {
    console.error('Error fetching reminders:', error.message);
    res.status(400).json({ message: error.message }); // Handle error
  }
};  
  
// Function to update a specific reminder
exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, datetime, completed } = req.body;
    
    // Find and update the reminder
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      { text, datetime, completed },
      { new: true }
    );

    // Check if reminder was found and updated
    if (!updatedReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json(updatedReminder); // Respond with updated reminder
  } catch (error) {
    console.error('Error updating reminder:', error.message);
    res.status(400).json({ message: error.message }); // Handle error
  }
};

// Function to delete a specific reminder
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the reminder
    const deletedReminder = await Reminder.findByIdAndDelete(id);

    // Check if reminder was found and deleted
    if (!deletedReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ message: 'Reminder deleted successfully' }); // Respond with success message
  } catch (error) {
    console.error('Error deleting reminder:', error.message);
    res.status(400).json({ message: error.message }); // Handle error
  }
};

module.exports = exports;
