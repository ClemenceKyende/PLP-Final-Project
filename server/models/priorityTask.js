// models/priorityTask.js
const mongoose = require('mongoose');

const priorityTaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  }
});

module.exports = mongoose.model('PriorityTask', priorityTaskSchema);