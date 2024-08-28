const Reminder = require('../models/reminderModel');
const mongoose = require('mongoose');

// Fetch all reminders for a specific user
exports.getAllReminders = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Ensure user_id is a valid ObjectId if using MongoDB
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Convert user_id to ObjectId
        const objectId = mongoose.Types.ObjectId(user_id);

        const reminders = await Reminder.find({ user_id: objectId });

        // Ensure the response is always an array
        if (!Array.isArray(reminders)) {
            return res.status(500).json({ message: 'Unexpected response format from database' });
        }

        res.json(reminders); // Send reminders as JSON
    } catch (error) {
        console.error('Error fetching reminders:', error.message);
        res.status(400).json({ message: error.message }); // Send error message if something goes wrong
    }
};

// Create a new reminder
exports.createReminder = async (req, res) => {
    try {
        const { text, dueTime, user_id } = req.body;

        // Ensure user_id is a valid ObjectId if using MongoDB
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Convert user_id to ObjectId
        const objectId = mongoose.Types.ObjectId(user_id);

        const newReminder = new Reminder({ text, dueTime, user_id: objectId });
        await newReminder.save();
        
        res.status(201).json(newReminder); // Send the created reminder as response
    } catch (error) {
        console.error('Error creating reminder:', error.message);
        res.status(400).json({ message: error.message }); // Handle error
    }
};

// Update an existing reminder
exports.updateReminder = async (req, res) => {
    try {
        const { reminder_id } = req.params;
        const { text, dueTime, completed } = req.body;

        // Ensure reminder_id is a valid ObjectId if using MongoDB
        if (!mongoose.Types.ObjectId.isValid(reminder_id)) {
            return res.status(400).json({ message: 'Invalid reminder ID format' });
        }

        // Convert reminder_id to ObjectId
        const objectId = mongoose.Types.ObjectId(reminder_id);

        const updatedReminder = await Reminder.findByIdAndUpdate(
            objectId,
            { text, dueTime, completed },
            { new: true }
        );

        if (!updatedReminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.json(updatedReminder); // Send the updated reminder as response
    } catch (error) {
        console.error('Error updating reminder:', error.message);
        res.status(400).json({ message: error.message }); // Handle error
    }
};

// Delete an existing reminder
exports.deleteReminder = async (req, res) => {
    try {
        const { reminder_id } = req.params;

        // Ensure reminder_id is a valid ObjectId if using MongoDB
        if (!mongoose.Types.ObjectId.isValid(reminder_id)) {
            return res.status(400).json({ message: 'Invalid reminder ID format' });
        }

        // Convert reminder_id to ObjectId
        const objectId = mongoose.Types.ObjectId(reminder_id);

        const deletedReminder = await Reminder.findByIdAndDelete(objectId);

        if (!deletedReminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.json({ message: 'Reminder deleted successfully', reminder: deletedReminder }); // Send confirmation of deletion
    } catch (error) {
        console.error('Error deleting reminder:', error.message);
        res.status(400).json({ message: error.message }); // Handle error
    }
};
