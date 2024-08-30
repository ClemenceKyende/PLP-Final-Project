const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the reminder schema
const reminderSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId, 
    ref: 'User', // Ensure this matches the name of your user model
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Add an index on user_id to improve performance
reminderSchema.index({ user_id: 1 });

// Create and export the Reminder model
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
