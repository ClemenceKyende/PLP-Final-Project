const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['work', 'personal', 'other'],
    required: function() {
      return this.type === 'organized';
    }
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'priority', 'organized'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: function() {
      return this.type === 'priority';
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
