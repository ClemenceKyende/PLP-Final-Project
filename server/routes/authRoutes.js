const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign-up route 
router.post('/signup',authController.signupUser);

// Login route 
router.post('/login',authController.loginUser);

// Route to send a password reset email 
router.post('/send-reset-password-email',authController.sendResetPasswordEmail);

// Route to reset the password using a token 
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
