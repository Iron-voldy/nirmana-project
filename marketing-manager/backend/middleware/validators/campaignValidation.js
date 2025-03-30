// middleware/validators/campaignValidation.js
const { check } = require('express-validator');

/**
 * Validation rules for creating a campaign
 */
const campaignCreateValidation = [
  check('name')
    .notEmpty().withMessage('Campaign name is required')
    .trim(),
  check('budget')
    .notEmpty().withMessage('Budget is required')
    .isNumeric().withMessage('Budget must be a number'),
  check('startDate')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Start date must be a valid date'),
  check('endDate')
    .notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('End date must be a valid date')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  check('platforms')
    .isArray().withMessage('Platforms must be an array')
    .custom(platforms => {
      const validPlatforms = ['facebook', 'instagram', 'twitter', 'google', 'email', 'other'];
      if (platforms && platforms.length > 0) {
        const isValid = platforms.every(platform => validPlatforms.includes(platform));
        if (!isValid) {
          throw new Error('Invalid platform(s)');
        }
      }
      return true;
    }),
  check('targetAudience.ageRange.min')
    .optional()
    .isInt({ min: 13 }).withMessage('Minimum age must be 13 or above'),
  check('targetAudience.ageRange.max')
    .optional()
    .isInt({ max: 100 }).withMessage('Maximum age must be 100 or below')
];

/**
 * Validation rules for updating a campaign
 */
const campaignUpdateValidation = [
  check('name')
    .optional()
    .notEmpty().withMessage('Campaign name cannot be empty')
    .trim(),
  check('budget')
    .optional()
    .isNumeric().withMessage('Budget must be a number'),
  check('startDate')
    .optional()
    .isISO8601().withMessage('Start date must be a valid date'),
  check('endDate')
    .optional()
    .isISO8601().withMessage('End date must be a valid date')
    .custom((endDate, { req }) => {
      if (req.body.startDate && new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  check('platforms')
    .optional()
    .isArray().withMessage('Platforms must be an array')
    .custom(platforms => {
      const validPlatforms = ['facebook', 'instagram', 'twitter', 'google', 'email', 'other'];
      if (platforms && platforms.length > 0) {
        const isValid = platforms.every(platform => validPlatforms.includes(platform));
        if (!isValid) {
          throw new Error('Invalid platform(s)');
        }
      }
      return true;
    }),
  check('status')
    .optional()
    .isIn(['draft', 'scheduled', 'active', 'completed', 'cancelled']).withMessage('Invalid status')
];

module.exports = {
  campaignCreateValidation,
  campaignUpdateValidation
};