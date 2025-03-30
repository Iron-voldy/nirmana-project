// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { loginValidation, registerValidation } = require('../middleware/validators/authValidation');
const { validateRequest } = require('../middleware/validation');
const { check } = require('express-validator');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginValidation, validateRequest, authController.login);

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', registerValidation, validateRequest, authController.register);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getMe);

// @route   POST api/auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', 
  auth, 
  [
    check('currentPassword').notEmpty().withMessage('Current password is required'),
    check('newPassword')
      .notEmpty().withMessage('New password is required')
      .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  ],
  validateRequest,
  authController.changePassword
);

// @route   POST api/auth/logout
// @desc    Logout user / invalidate token (client-side)
// @access  Private
router.post('/logout', auth, authController.logout);

module.exports = router;