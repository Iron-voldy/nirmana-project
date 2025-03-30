// middleware/validators/analyticsValidation.js
const { query, param } = require('express-validator');

/**
 * Validation rules for analytics overview
 */
const analyticsOverviewValidation = [
  query('timeRange')
    .optional()
    .isIn(['today', 'yesterday', 'last7days', 'last30days', 'thisMonth', 'lastMonth'])
    .withMessage('Invalid time range. Valid options are: today, yesterday, last7days, last30days, thisMonth, lastMonth')
];

/**
 * Validation rules for campaign analytics
 */
const campaignAnalyticsValidation = [
  param('campaignId')
    .notEmpty().withMessage('Campaign ID is required')
    .custom(value => {
      const mongoose = require('mongoose');
      return mongoose.Types.ObjectId.isValid(value);
    }).withMessage('Invalid campaign ID format')
];

/**
 * Validation rules for promo code analytics
 */
const promoCodeAnalyticsValidation = [
  param('promoCodeId')
    .notEmpty().withMessage('Promo code ID is required')
    .custom(value => {
      const mongoose = require('mongoose');
      return mongoose.Types.ObjectId.isValid(value);
    }).withMessage('Invalid promo code ID format')
];

module.exports = {
  analyticsOverviewValidation,
  campaignAnalyticsValidation,
  promoCodeAnalyticsValidation
};