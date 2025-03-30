// routes/promoCode.js
const express = require('express');
const router = express.Router();
const promoCodeController = require('../controllers/promoCodeController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateRequest } = require('../middleware/validation');
const { 
  promoCodeCreateValidation, 
  promoCodeUpdateValidation 
} = require('../middleware/validators/promoCodeValidation');
const { param } = require('express-validator');

// MongoDB ObjectId Validation middleware
const validateObjectId = [
  param('id').custom(value => {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(value);
  }).withMessage('Invalid ID format'),
  validateRequest
];

// @route   GET api/promo-codes
// @desc    Get all promo codes
// @access  Private (marketing_manager only)
router.get('/', auth, roleCheck('admin', 'marketing_manager'), promoCodeController.getAllPromoCodes);

// @route   GET api/promo-codes/:id
// @desc    Get a promo code by ID
// @access  Private (marketing_manager only)
router.get('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  promoCodeController.getPromoCode
);

// @route   POST api/promo-codes
// @desc    Create a new promo code
// @access  Private (marketing_manager only)
router.post('/', 
  auth, 
  roleCheck('admin', 'marketing_manager'), 
  promoCodeCreateValidation,
  validateRequest,
  promoCodeController.createPromoCode
);

// @route   PUT api/promo-codes/:id
// @desc    Update a promo code
// @access  Private (marketing_manager only)
router.put('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  promoCodeUpdateValidation,
  validateRequest,
  promoCodeController.updatePromoCode
);

// @route   DELETE api/promo-codes/:id
// @desc    Delete a promo code
// @access  Private (marketing_manager only)
router.delete('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  promoCodeController.deletePromoCode
);

module.exports = router;