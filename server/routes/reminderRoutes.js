const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// Route to create a new reminder
router.post('/reminders', reminderController.createReminder);

// Route to get all reminders for a specific user
router.get('/reminders/:user_id', reminderController.getAllReminders);

// Route to update a specific reminder
router.put('/reminders/:id', reminderController.updateReminder);

// Route to delete a specific reminder
router.delete('/reminders/:id', reminderController.deleteReminder);

module.exports = router;
