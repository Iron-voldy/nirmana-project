const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  promoCodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PromoCode'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialMediaPost'
  },
  metrics: {
    views: {
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
    },
    revenue: {
      type: Number,
      default: 0
    }
  },
  userDemographics: {
    age: {
      '18-24': Number,
      '25-34': Number,
      '35-44': Number,
      '45-54': Number,
      '55+': Number
    },
    gender: {
      male: Number,
      female: Number,
      other: Number
    },
    location: Map
  }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
