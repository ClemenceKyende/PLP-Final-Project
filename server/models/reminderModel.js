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
  datetime: {
    type: Date,
    required: true
  },
  user_id: {
    type: String, // Accept user_id as a string
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
