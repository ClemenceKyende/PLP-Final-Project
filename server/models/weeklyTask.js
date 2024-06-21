const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weeklyTaskSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true // Ensures leading/trailing spaces are trimmed
  },
  type: {
    type: String,
    default: 'weekly'
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index example: ensure fast lookup by type and completed status
weeklyTaskSchema.index({ type: 1, completed: 1 });

const WeeklyTask = mongoose.model('WeeklyTask', weeklyTaskSchema);

module.exports = WeeklyTask;
