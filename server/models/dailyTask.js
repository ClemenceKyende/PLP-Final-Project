const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyTaskSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true // Ensures leading/trailing spaces are trimmed
  },
  type: {
    type: String,
    default: 'daily'
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
dailyTaskSchema.index({ type: 1, completed: 1 });

const DailyTask = mongoose.model('DailyTask', dailyTaskSchema);

module.exports = DailyTask;
