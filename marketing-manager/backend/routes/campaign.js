// routes/campaign.js
const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateRequest } = require('../middleware/validation');
const { 
  campaignCreateValidation, 
  campaignUpdateValidation 
} = require('../middleware/validators/campaignValidation');
const { param } = require('express-validator');

// MongoDB ObjectId Validation middleware
const validateObjectId = [
  param('id').custom(value => {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(value);
  }).withMessage('Invalid ID format'),
  validateRequest
];

// @route   GET api/campaigns
// @desc    Get all campaigns
// @access  Private (marketing_manager only)
router.get('/', auth, roleCheck('admin', 'marketing_manager'), campaignController.getAllCampaigns);

// @route   GET api/campaigns/:id
// @desc    Get a campaign by ID
// @access  Private (marketing_manager only)
router.get('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  campaignController.getCampaign
);

// @route   POST api/campaigns
// @desc    Create a new campaign
// @access  Private (marketing_manager only)
router.post('/', 
  auth, 
  roleCheck('admin', 'marketing_manager'), 
  campaignCreateValidation,
  validateRequest,
  campaignController.createCampaign
);

// @route   PUT api/campaigns/:id
// @desc    Update a campaign
// @access  Private (marketing_manager only)
router.put('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  campaignUpdateValidation,
  validateRequest,
  campaignController.updateCampaign
);

// @route   DELETE api/campaigns/:id
// @desc    Delete a campaign
// @access  Private (marketing_manager only)
router.delete('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  campaignController.deleteCampaign
);

module.exports = router;