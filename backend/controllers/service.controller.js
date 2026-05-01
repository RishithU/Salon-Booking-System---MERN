// controllers/service.controller.js

const Service = require("../models/service.model");
const Shop = require("../models/shop.model");

exports.createService = async (req, res) => {
  try {
    const { name, price, duration, description } = req.body;

    //  1. Basic validation
    if (!name || !price || !duration) {
      return res.status(400).json({
        message: "Name, price, and duration are required"
      });
    }

    //  2. Find shop using ownerId 
    const shop = await Shop.findOne({
      ownerId: req.user.userId
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found for this owner"
      });
    }

    const shopId = shop._id;

    //  3. Prevent duplicate service in same shop
    const existingService = await Service.findOne({
      name,
      shopId
    });

    if (existingService) {
      return res.status(400).json({
        message: "Service already exists in your shop"
      });
    }

    // 4. Create service
    const service = new Service({
      name,
      price,
      duration,
      description,
      shopId
    });

    let result= await service.save();

    res.status(201).send({
      message: "Service created successfully",
      result
    });

  } catch (error) {

    // 🔥 Handle unique index error (backup safety)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Service already exists"
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};