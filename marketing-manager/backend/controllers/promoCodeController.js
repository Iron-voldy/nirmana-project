const PromoCode = require('../models/PromoCode');

// Get all promo codes
exports.getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });
    res.status(200).json(promoCodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single promo code
exports.getPromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findById(req.params.id);
    
    if (!promoCode) {
      return res.status(404).json({ message: 'Promo code not found' });
    }
    
    res.status(200).json(promoCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new promo code
exports.createPromoCode = async (req, res) => {
  try {
    const { code, discountPercentage, expirationDate, conditions } = req.body;
    
    // Check if promo code already exists
    const existingPromo = await PromoCode.findOne({ code: code.toUpperCase() });
    if (existingPromo) {
      return res.status(400).json({ message: 'Promo code already exists' });
    }
    
    const newPromoCode = new PromoCode({
      code: code.toUpperCase(),
      discountPercentage,
      expirationDate,
      conditions,
      createdBy: req.user.id
    });
    
    await newPromoCode.save();
    
    res.status(201).json(newPromoCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a promo code
exports.updatePromoCode = async (req, res) => {
  try {
    const { discountPercentage, expirationDate, conditions, isActive } = req.body;
    
    let promoCode = await PromoCode.findById(req.params.id);
    
    if (!promoCode) {
      return res.status(404).json({ message: 'Promo code not found' });
    }
    
    // Update fields
    if (discountPercentage) promoCode.discountPercentage = discountPercentage;
    if (expirationDate) promoCode.expirationDate = expirationDate;
    if (conditions) promoCode.conditions = conditions;
    if (isActive !== undefined) promoCode.isActive = isActive;
    
    promoCode = await promoCode.save();
    
    res.status(200).json(promoCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a promo code
exports.deletePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findById(req.params.id);
    
    if (!promoCode) {
      return res.status(404).json({ message: 'Promo code not found' });
    }
    
    await PromoCode.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Promo code deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

