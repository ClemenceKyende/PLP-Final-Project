const Reminder = require('../models/reminderModel');
const mongoose = require('mongoose');


// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { text, datetime, user_id } = req.body;

    // Validate required fields
    if (!text || !datetime || !user_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate and convert user_id to ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const parsedDate = new Date(datetime);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid datetime format' });
    }

    const newReminder = await Reminder.create({
      text,
      datetime: parsedDate,
      user_id: mongoose.Types.ObjectId(user_id) // Ensure user_id is an ObjectId
    });

    res.status(201).json(newReminder);
  } catch (error) {
    console.error('Error creating reminder:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Function to get all reminders for a user
exports.getAllReminders = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    // Find all reminders for the specified user
    const reminders = await Reminder.find({ user_id });
    
    res.json(reminders); // Respond with reminders
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Handle error
  }
};

// Function to update a specific reminder
exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, datetime, completed } = req.body;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid reminder ID format' });
    }

    // Validate datetime format
    let parsedDate;
    if (datetime) {
      parsedDate = new Date(datetime);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid datetime format' });
      }
    }

    // Find and update the reminder
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      { text, datetime: parsedDate, completed },
      { new: true }
    );

    // Check if reminder was found and updated
    if (!updatedReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json(updatedReminder); // Respond with updated reminder
  } catch (error) {
    console.error('Error updating reminder:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Handle error
  }
};

// Function to delete a specific reminder
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid reminder ID format' });
    }

    // Find and delete the reminder
    const deletedReminder = await Reminder.findByIdAndDelete(id);

    // Check if reminder was found and deleted
    if (!deletedReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ message: 'Reminder deleted successfully' }); // Respond with success message
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Handle error
  }
};

module.exports = exports;
