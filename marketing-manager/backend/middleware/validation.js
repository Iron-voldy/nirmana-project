// middleware/validation.js
const { validationResult } = require('express-validator');

/**
 * Middleware to validate request data using express-validator
 * Checks for validation errors and returns them if found
 */
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      status: 'error',
      errors: errors.array() 
    });
  }
  next();
};