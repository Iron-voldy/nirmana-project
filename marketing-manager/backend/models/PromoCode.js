const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  expirationDate: {
    type: Date,
    required: true
  },
  conditions: {
    minPurchaseAmount: {
      type: Number,
      default: 0
    },
    productCategory: {
      type: String,
      default: null
    },
    isFirstPurchaseOnly: {
      type: Boolean,
      default: false
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  usageCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('PromoCode', PromoCodeSchema);
