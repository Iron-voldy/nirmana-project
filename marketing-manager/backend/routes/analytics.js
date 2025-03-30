const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// @route   GET api/analytics
// @desc    Get analytics overview
// @access  Private (marketing_manager only)
router.get('/', auth, roleCheck('admin', 'marketing_manager'), analyticsController.getAnalyticsOverview);

// @route   GET api/analytics/campaigns/:campaignId
// @desc    Get analytics for a specific campaign
// @access  Private (marketing_manager only)
router.get('/campaigns/:campaignId', auth, roleCheck('admin', 'marketing_manager'), analyticsController.getCampaignAnalytics);

// @route   GET api/analytics/promo-codes/:promoCodeId
// @desc    Get analytics for a specific promo code
// @access  Private (marketing_manager only)
router.get('/promo-codes/:promoCodeId', auth, roleCheck('admin', 'marketing_manager'), analyticsController.getPromoCodeAnalytics);

module.exports = router;
