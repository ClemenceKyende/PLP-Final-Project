const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { protect } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes for views
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')));
app.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, '../views/signup.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
app.get('/about.html', (req, res) => res.sendFile(path.join(__dirname, '../views/about.html')));
app.get('/dashboard.html', (req, res) => res.sendFile(path.join(__dirname, '../views/dashboard.html')));
app.get('/resetpassword.html', (req, res) => res.sendFile(path.join(__dirname, '../views/resetpassword.html')));
app.get('/profile.html', (req, res) => res.sendFile(path.join(__dirname, '../views/profile.html')));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);  
app.use('/api/reminders', reminderRoutes); 
app.use('/api/users', protect, userRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: 'Sorry, page not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'MongoError') {
    res.status(500).json({ error: 'MongoDB Error', message: err.message });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: 'Validation Error', message: err.message });
  } else {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'your_default_mongo_uri';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
