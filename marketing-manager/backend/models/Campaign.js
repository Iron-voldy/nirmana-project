const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  targetAudience: {
    ageRange: {
      min: Number,
      max: Number
    },
    gender: String,
    location: String,
    interests: [String]
  },
  budget: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  platforms: {
    type: [String],
    enum: ['facebook', 'instagram', 'twitter', 'google', 'email', 'other'],
    default: ['email']
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  description: {
    type: String
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
  metrics: {
    impressions: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
