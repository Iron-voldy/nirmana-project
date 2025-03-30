const Analytics = require('../models/Analytics');
const Campaign = require('../models/Campaign');
const PromoCode = require('../models/PromoCode');
const SocialMediaPost = require('../models/SocialMediaPost');

// Get overview of all analytics
exports.getAnalyticsOverview = async (req, res) => {
  try {
    const timeRange = req.query.timeRange || 'last30days';
    let startDate;
    const endDate = new Date();
    
    switch (timeRange) {
      case 'today':
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'yesterday':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'last7days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'last30days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'thisMonth':
        startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'lastMonth':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        const lastDayOfLastMonth = new Date();
        lastDayOfLastMonth.setDate(0);
        endDate.setFullYear(
          lastDayOfLastMonth.getFullYear(),
          lastDayOfLastMonth.getMonth(),
          lastDayOfLastMonth.getDate(),
          23, 59, 59, 999
        );
        break;
      default:
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
    }
    
    // Get analytics for the time period
    const analyticsData = await Analytics.find({
      date: { $gte: startDate, $lte: endDate }
    });
    
    // Calculate totals
    const totals = analyticsData.reduce((acc, item) => {
      acc.views += item.metrics.views;
      acc.clicks += item.metrics.clicks;
      acc.conversions += item.metrics.conversions;
      acc.revenue += item.metrics.revenue;
      return acc;
    }, { views: 0, clicks: 0, conversions: 0, revenue: 0 });
    
    // Get campaign performance
    const campaigns = await Campaign.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });
    
    const campaignPerformance = campaigns.map(campaign => ({
      id: campaign._id,
      name: campaign.name,
      metrics: campaign.metrics,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      status: campaign.status
    }));
    
    // Get promo code usage
    const promoCodes = await PromoCode.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });
    
    const promoCodeUsage = promoCodes.map(promo => ({
      id: promo._id,
      code: promo.code,
      discountPercentage: promo.discountPercentage,
      expirationDate: promo.expirationDate,
      usageCount: promo.usageCount,
      isActive: promo.isActive
    }));
    
    // Get social media performance
    const socialMediaPosts = await SocialMediaPost.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });
    
    const socialMediaPerformance = socialMediaPosts.map(post => ({
      id: post._id,
      platforms: post.platforms,
      scheduledTime: post.scheduledTime,
      status: post.status,
      metrics: post.metrics
    }));
    
    res.status(200).json({
      timeRange,
      totals,
      campaignPerformance,
      promoCodeUsage,
      socialMediaPerformance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get campaign-specific analytics
exports.getCampaignAnalytics = async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    const analyticsData = await Analytics.find({ campaignId });
    
    res.status(200).json({
      campaign,
      analytics: analyticsData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get promo code analytics
exports.getPromoCodeAnalytics = async (req, res) => {
  try {
    const { promoCodeId } = req.params;
    
    const promoCode = await PromoCode.findById(promoCodeId);
    if (!promoCode) {
      return res.status(404).json({ message: 'Promo code not found' });
    }
    
    const analyticsData = await Analytics.find({ promoCodeId });
    
    res.status(200).json({
      promoCode,
      analytics: analyticsData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
