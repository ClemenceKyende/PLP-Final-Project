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
    type: Schema.Types.ObjectId, 
    ref: 'user', 
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
