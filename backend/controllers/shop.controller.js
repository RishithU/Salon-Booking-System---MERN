// controllers/shop.controller.js

const Shop = require("../models/shop.model");

exports.createShop = async (req, res) => {
  try {
    console.log(req.body);
    const { name, location } = req.body;

    // IMPORTANT: One owner → One shop (your rule)
    console.log(req.user.userId)
    const existingShop = await Shop.findOne({ ownerId: req.user.userId });

    if (existingShop) {
      return res.status(400).send({
        message: "Owner already has a shop"
      });
    }

    const shop = new Shop({
      name,
      location,
      ownerId: req.user.userId
    });
    console.log(shop)
    let result = await shop.save();

    res.status(201).send({
      message: "Shop created successfully",
      result
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getDashboardAggregation=require("../utils/dashboard.utils")

exports.getOwnerDashboardBookings = async (req, res) => {
  try {
    const { shopId } = req.params;

    const shop = await Shop.findOne({
      _id: shopId,
      ownerId: req.user._id
    });

    if (!shop) {
      return res.status(403).json({
        message: "Unauthorized or shop not found"
      });
    }

    const data = await getDashboardAggregation.getDashboardData(shopId);

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};