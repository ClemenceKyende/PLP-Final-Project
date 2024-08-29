// models/organizedTask.js
const mongoose = require('mongoose');

const organizedTaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Other'],
    required: true
  }
});

module.exports = mongoose.model('OrganizedTask', organizedTaskSchema);