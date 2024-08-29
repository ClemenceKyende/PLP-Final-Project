const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monthlyTaskSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true // Ensures leading/trailing spaces are trimmed
  },
  type: {
    type: String,
    default: 'monthly'
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
monthlyTaskSchema.index({ type: 1, completed: 1 });

const MonthlyTask = mongoose.model('MonthlyTask', monthlyTaskSchema);

module.exports = MonthlyTask;