// middleware/validators/socialMediaValidation.js
const { check } = require('express-validator');

/**
 * Validation rules for creating a social media post
 */
const socialMediaPostCreateValidation = [
  check('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 2000 }).withMessage('Content must be less than 2000 characters'),
  check('scheduledTime')
    .notEmpty().withMessage('Scheduled time is required')
    .isISO8601().withMessage('Scheduled time must be a valid date')
    .custom(date => {
      if (new Date(date) <= new Date()) {
        throw new Error('Scheduled time must be in the future');
      }
      return true;
    }),
  check('platforms')
    .notEmpty().withMessage('At least one platform is required')
    .isArray().withMessage('Platforms must be an array')
    .custom(platforms => {
      const validPlatforms = ['facebook', 'instagram', 'twitter', 'linkedin'];
      if (platforms && platforms.length > 0) {
        const isValid = platforms.every(platform => validPlatforms.includes(platform));
        if (!isValid) {
          throw new Error('Invalid platform(s)');
        }
      } else {
        throw new Error('At least one platform is required');
      }
      return true;
    }),
  check('campaign')
    .optional()
    .custom(value => {
      const mongoose = require('mongoose');
      return mongoose.Types.ObjectId.isValid(value);
    }).withMessage('Invalid campaign ID format'),
  check('images')
    .optional()
    .isArray().withMessage('Images must be an array')
];

/**
 * Validation rules for updating a social media post
 */
const socialMediaPostUpdateValidation = [
  check('content')
    .optional()
    .isLength({ max: 2000 }).withMessage('Content must be less than 2000 characters'),
  check('scheduledTime')
    .optional()
    .isISO8601().withMessage('Scheduled time must be a valid date')
    .custom((date, { req }) => {
      if (req.body.status !== 'posted' && new Date(date) <= new Date()) {
        throw new Error('Scheduled time must be in the future');
      }
      return true;
    }),
  check('platforms')
    .optional()
    .isArray().withMessage('Platforms must be an array')
    .custom(platforms => {
      const validPlatforms = ['facebook', 'instagram', 'twitter', 'linkedin'];
      if (platforms && platforms.length > 0) {
        const isValid = platforms.every(platform => validPlatforms.includes(platform));
        if (!isValid) {
          throw new Error('Invalid platform(s)');
        }
      } else {
        throw new Error('At least one platform is required');
      }
      return true;
    }),
  check('status')
    .optional()
    .isIn(['scheduled', 'posted', 'failed']).withMessage('Invalid status'),
  check('campaign')
    .optional()
    .custom(value => {
      const mongoose = require('mongoose');
      return mongoose.Types.ObjectId.isValid(value);
    }).withMessage('Invalid campaign ID format'),
  check('images')
    .optional()
    .isArray().withMessage('Images must be an array')
];

module.exports = {
  socialMediaPostCreateValidation,
  socialMediaPostUpdateValidation
};