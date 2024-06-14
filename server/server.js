// Load environment variables from .env file
const result = require('dotenv').config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}

// Import required modules
const mongoose = require('mongoose');
const app = require('./app'); // Ensure this path is correct

// Logging environment variables to debug
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error('MongoDB connection URI not provided.');
  process.exit(1);
}

if (!process.env.PORT) {
  console.error('Port number not provided.');
  process.exit(1);
}

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the application if the database connection fails
});

// Graceful shutdown
const gracefulShutdown = () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection disconnected through app termination');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening at http://0.0.0.0:${PORT}`);
});
