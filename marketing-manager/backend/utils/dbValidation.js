// utils/dbValidation.js

/**
 * Common database validators for use in Mongoose models
 */

const mongoose = require('mongoose');

// Email validation regex
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// URL validation regex
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Password validation regex - minimum 8 characters, at least one letter, one number, and one special character
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Username validation regex - alphanumeric with underscores, 3-20 characters
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

// Validators
const validators = {
  // Email validator
  email: {
    validator: function(email) {
      return emailRegex.test(email);
    },
    message: props => `${props.value} is not a valid email address`
  },
  
  // URL validator
  url: {
    validator: function(url) {
      return urlRegex.test(url);
    },
    message: props => `${props.value} is not a valid URL`
  },
  
  // Password validator
  password: {
    validator: function(password) {
      return passwordRegex.test(password);
    },
    message: () => 'Password must be at least 8 characters and include at least one letter, one number, and one special character'
  },
  
  // Username validator
  username: {
    validator: function(username) {
      return usernameRegex.test(username);
    },
    message: props => `${props.value} is not a valid username. Use only letters, numbers, and underscores (3-20 characters).`
  },
  
  // ObjectId validator
  objectId: {
    validator: function(id) {
      return mongoose.Types.ObjectId.isValid(id);
    },
    message: props => `${props.value} is not a valid ObjectId`
  },
  
  // Future date validator
  futureDate: {
    validator: function(date) {
      return new Date(date) > new Date();
    },
    message: props => `${props.path} must be a future date`
  },
  
  // Date range validator (start < end)
  dateRange: {
    validator: function(endDate) {
      // 'this' refers to the document being validated
      return new Date(endDate) > new Date(this.startDate);
    },
    message: 'End date must be after start date'
  },
  
  // Percentage validator (0-100)
  percentage: {
    validator: function(value) {
      return value >= 0 && value <= 100;
    },
    message: props => `${props.value} is not a valid percentage (0-100)`
  },
  
  // Phone number validator
  phoneNumber: {
    validator: function(phone) {
      // Simple international phone format
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(phone);
    },
    message: props => `${props.value} is not a valid phone number`
  },
  
  // Array of valid values validator
  enum: (validValues) => ({
    validator: function(value) {
      return validValues.includes(value);
    },
    message: props => `${props.value} is not a valid option. Valid options are: ${validValues.join(', ')}`
  }),
  
  // Array of valid values for array fields
  arrayEnum: (validValues) => ({
    validator: function(array) {
      return array.every(item => validValues.includes(item));
    },
    message: props => `Array contains invalid values. Valid options are: ${validValues.join(', ')}`
  })
};

module.exports = validators;