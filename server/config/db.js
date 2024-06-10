const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'test', // Specify the name of the database here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to "test" database');
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
