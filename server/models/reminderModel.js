const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true, // Automatically generate ObjectId
    required: true,
    unique: true // Ensure uniqueness of reminder IDs
  },
  text: {
    type: String,
    required: true
  },
  dueTime: { // Renamed from 'datetime' to 'dueTime' for clarity
    type: Date,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId, // Changed to ObjectId for relational reference
    ref: 'User', // Assuming you have a User model
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
