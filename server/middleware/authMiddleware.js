const jwt = require('jsonwebtoken'); 
const User = require('../models/user');
require('dotenv').config();

// Define jwtSecret here by reading from the environment variable or using a fallback value
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);

      // Verify the token using the jwtSecret
      const decoded = jwt.verify(token, jwtSecret);
      console.log('Decoded Token:', decoded);

      // Find the user by the decoded id from the token
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User from token:', req.user);

      if (!req.user) {
        console.error('User not found for ID:', decoded.id);
        return res.status(401).json({ error: 'User not found' });
      }
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired. Please log in again.' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token. Please log in again.' });
      } else {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Not authorized, token failed' });
      }
    }
  } else {
    console.error('No token provided');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
};
