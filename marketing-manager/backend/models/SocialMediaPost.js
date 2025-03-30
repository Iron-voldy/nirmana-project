const mongoose = require('mongoose');

const SocialMediaPostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  images: {
    type: [String]
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  platforms: {
    type: [String],
    enum: ['facebook', 'instagram', 'twitter', 'linkedin'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'posted', 'failed'],
    default: 'scheduled'
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
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
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('SocialMediaPost', SocialMediaPostSchema);

