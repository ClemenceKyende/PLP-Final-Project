const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add this line

const app = express();

// Middleware
app.use(bodyParser.json()); // Add this line
app.use(bodyParser.urlencoded({ extended: true })); // Add this line
app.use(cors());
app.use(helmet()); 
app.use(morgan('tiny'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
app.use('/api/reminders', reminderRoutes);


// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'your_default_mongo_uri';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Serve index.html on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: 'Sorry, page not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace to the console

  // Send specific error responses based on the type of error
  if (err.name === 'MongoError') {
    // MongoDB-related errors
    res.status(500).json({ error: 'MongoDB Error', message: err.message });
  } else if (err.name === 'ValidationError') {
    // Validation errors
    res.status(400).json({ error: 'Validation Error', message: err.message });
  } else {
    // Generic server errors
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

module.exports = app;
