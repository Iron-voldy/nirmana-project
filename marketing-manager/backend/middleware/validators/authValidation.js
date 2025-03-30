// middleware/validators/authValidation.js
const { check } = require('express-validator');

/**
 * Validation rules for user login
 */
const loginValidation = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  check('password')
    .notEmpty().withMessage('Password is required')
];

/**
 * Validation rules for user registration
 */
const registerValidation = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .trim(),
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  check('role')
    .optional()
    .isIn(['admin', 'marketing_manager', 'user']).withMessage('Invalid role')
];

module.exports = {
  loginValidation,
  registerValidation
};