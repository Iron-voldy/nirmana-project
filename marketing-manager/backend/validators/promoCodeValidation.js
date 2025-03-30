// middleware/validators/promoCodeValidation.js
const { check } = require('express-validator');

/**
 * Validation rules for creating a promo code
 */
const promoCodeCreateValidation = [
  check('code')
    .notEmpty().withMessage('Promo code is required')
    .isLength({ min: 3, max: 20 }).withMessage('Promo code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9_-]+$/).withMessage('Promo code can only contain uppercase letters, numbers, underscores, and hyphens')
    .trim(),
  check('discountPercentage')
    .notEmpty().withMessage('Discount percentage is required')
    .isFloat({ min: 0, max: 100 }).withMessage('Discount percentage must be between 0 and 100'),
  check('expirationDate')
    .notEmpty().withMessage('Expiration date is required')
    .isISO8601().withMessage('Expiration date must be a valid date')
    .custom(date => {
      if (new Date(date) <= new Date()) {
        throw new Error('Expiration date must be in the future');
      }
      return true;
    }),
  check('conditions.minPurchaseAmount')
    .optional()
    .isFloat({ min: 0 }).withMessage('Minimum purchase amount must be a positive number'),
  check('conditions.isFirstPurchaseOnly')
    .optional()
    .isBoolean().withMessage('First purchase only must be a boolean value')
];

/**
 * Validation rules for updating a promo code
 */
const promoCodeUpdateValidation = [
  check('discountPercentage')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Discount percentage must be between 0 and 100'),
  check('expirationDate')
    .optional()
    .isISO8601().withMessage('Expiration date must be a valid date')
    .custom(date => {
      if (new Date(date) <= new Date()) {
        throw new Error('Expiration date must be in the future');
      }
      return true;
    }),
  check('conditions.minPurchaseAmount')
    .optional()
    .isFloat({ min: 0 }).withMessage('Minimum purchase amount must be a positive number'),
  check('conditions.isFirstPurchaseOnly')
    .optional()
    .isBoolean().withMessage('First purchase only must be a boolean value'),
  check('isActive')
    .optional()
    .isBoolean().withMessage('Active status must be a boolean value')
];

module.exports = {
  promoCodeCreateValidation,
  promoCodeUpdateValidation
};