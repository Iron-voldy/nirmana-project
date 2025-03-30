const Campaign = require('../models/Campaign');

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single campaign
exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    res.status(200).json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const { 
      name, 
      targetAudience, 
      budget, 
      startDate, 
      endDate, 
      platforms, 
      description 
    } = req.body;
    
    const newCampaign = new Campaign({
      name,
      targetAudience,
      budget,
      startDate,
      endDate,
      platforms,
      description,
      createdBy: req.user.id,
      status: 'scheduled'
    });
    
    await newCampaign.save();
    
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
  try {
    const {
      name,
      targetAudience,
      budget,
      startDate,
      endDate,
      platforms,
      description,
      status
    } = req.body;
    
    let campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Update fields
    if (name) campaign.name = name;
    if (targetAudience) campaign.targetAudience = targetAudience;
    if (budget) campaign.budget = budget;
    if (startDate) campaign.startDate = startDate;
    if (endDate) campaign.endDate = endDate;
    if (platforms) campaign.platforms = platforms;
    if (description) campaign.description = description;
    if (status) campaign.status = status;
    
    campaign = await campaign.save();
    
    res.status(200).json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    await Campaign.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

