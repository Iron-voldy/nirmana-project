// routes/analytics.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateRequest } = require('../middleware/validation');
const { 
  analyticsOverviewValidation,
  campaignAnalyticsValidation,
  promoCodeAnalyticsValidation
} = require('../middleware/validators/analyticsValidation');

// @route   GET api/analytics
// @desc    Get analytics overview
// @access  Private (marketing_manager only)
router.get('/', 
  auth, 
  roleCheck('admin', 'marketing_manager'), 
  analyticsOverviewValidation,
  validateRequest,
  analyticsController.getAnalyticsOverview
);

// @route   GET api/analytics/campaigns/:campaignId
// @desc    Get analytics for a specific campaign
// @access  Private (marketing_manager only)
router.get('/campaigns/:campaignId', 
  auth, 
  roleCheck('admin', 'marketing_manager'), 
  campaignAnalyticsValidation,
  validateRequest,
  analyticsController.getCampaignAnalytics
);

// @route   GET api/analytics/promo-codes/:promoCodeId
// @desc    Get analytics for a specific promo code
// @access  Private (marketing_manager only)
router.get('/promo-codes/:promoCodeId', 
  auth, 
  roleCheck('admin', 'marketing_manager'), 
  promoCodeAnalyticsValidation,
  validateRequest,
  analyticsController.getPromoCodeAnalytics
);

module.exports = router;