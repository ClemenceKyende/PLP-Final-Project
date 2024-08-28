const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, jwtSecret);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }
      next();
    } catch (error) {
      console.error('Token verification failed:', error); // Log the entire error object
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    console.error('No token provided');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
};
