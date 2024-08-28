const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: '1h' });
};

exports.signupUser = async (req, res) => {
  try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
          console.error('Missing fields:', { username, email, password });
          return res.status(400).json({ error: 'All fields are required' });
      }

      let user = await User.findOne({ email });
      if (user) {
          console.error('User already exists:', { email });
          return res.status(400).json({ error: 'User already exists' });
      }

      user = new User({ username, email, password });
      await user.save();

      const token = generateToken(user._id);
      res.json({ token });
  } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          console.error('Missing fields:', { email, password });
          return res.status(400).json({ error: 'All fields are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
          console.error('Invalid credentials - user not found:', { email });
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.error('Invalid credentials - password mismatch');
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      res.json({ token });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
  }
};



// Function to log out a user (optional, can be customized based on your needs)
exports.logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Function to send a password reset email
exports.sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"TimeWise Support" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Function to reset the password using the token
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset token' });
    }

    // Hash the new password and update the user's password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Function to serve the reset password form
exports.resetPasswordForm = async (req, res) => {
  try {
    // Find the user by the reset token and check if it hasn't expired
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // If no user is found or the token is expired, return an error
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset token' });
    }

    // If the token is valid, send a response indicating the user can reset their password
    res.status(200).json({ message: 'Valid reset token. You can now reset your password.' });
  } catch (error) {
    console.error('Error serving reset password form:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
