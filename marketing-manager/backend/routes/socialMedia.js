// routes/socialMedia.js
const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/socialMediaController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateRequest } = require('../middleware/validation');
const { 
  socialMediaPostCreateValidation, 
  socialMediaPostUpdateValidation 
} = require('../middleware/validators/socialMediaValidation');
const { param } = require('express-validator');

// MongoDB ObjectId Validation middleware
const validateObjectId = [
  param('id').custom(value => {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(value);
  }).withMessage('Invalid ID format'),
  validateRequest
];

// @route   GET api/social-media
// @desc    Get all social media posts
// @access  Private (marketing_manager only)
router.get('/', auth, roleCheck('admin', 'marketing_manager'), socialMediaController.getAllPosts);

// @route   GET api/social-media/:id
// @desc    Get a social media post by ID
// @access  Private (marketing_manager only)
router.get('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  socialMediaController.getPost
);

// @route   POST api/social-media
// @desc    Create a new social media post
// @access  Private (marketing_manager only)
router.post('/', 
  auth, 
  roleCheck('admin', 'marketing_manager'), 
  socialMediaPostCreateValidation,
  validateRequest,
  socialMediaController.createPost
);

// @route   PUT api/social-media/:id
// @desc    Update a social media post
// @access  Private (marketing_manager only)
router.put('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  socialMediaPostUpdateValidation,
  validateRequest,
  socialMediaController.updatePost
);

// @route   DELETE api/social-media/:id
// @desc    Delete a social media post
// @access  Private (marketing_manager only)
router.delete('/:id', 
  auth, 
  validateObjectId,
  roleCheck('admin', 'marketing_manager'), 
  socialMediaController.deletePost
);

module.exports = router;