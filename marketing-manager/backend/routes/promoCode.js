const express = require('express');
const router = express.Router();
const promoCodeController = require('../controllers/promoCodeController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// @route   GET api/promo-codes
// @desc    Get all promo codes
// @access  Private (marketing_manager only)
router.get('/', auth, roleCheck('admin', 'marketing_manager'), promoCodeController.getAllPromoCodes);

// @route   GET api/promo-codes/:id
// @desc    Get a promo code by ID
// @access  Private (marketing_manager only)
router.get('/:id', auth, roleCheck('admin', 'marketing_manager'), promoCodeController.getPromoCode);

// @route   POST api/promo-codes
// @desc    Create a new promo code
// @access  Private (marketing_manager only)
router.post('/', auth, roleCheck('admin', 'marketing_manager'), promoCodeController.createPromoCode);

// @route   PUT api/promo-codes/:id
// @desc    Update a promo code
// @access  Private (marketing_manager only)
router.put('/:id', auth, roleCheck('admin', 'marketing_manager'), promoCodeController.updatePromoCode);

// @route   DELETE api/promo-codes/:id
// @desc    Delete a promo code
// @access  Private (marketing_manager only)
router.delete('/:id', auth, roleCheck('admin', 'marketing_manager'), promoCodeController.deletePromoCode);

module.exports = router;
