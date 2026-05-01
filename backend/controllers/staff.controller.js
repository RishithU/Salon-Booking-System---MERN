// controllers/staff.controller.js

const Staff = require("../models/staff.model");
const Shop = require("../models/shop.model");
const Service = require("../models/service.model");

exports.addStaff = async (req, res) => {
  try {
    const { name, services, email, phone, workingHours } = req.body;

    //1. Basic validation
    if (!name || !services || services.length === 0 || !workingHours.start || !workingHours.end) {
      return res.status(400).json({
        message: "Name, services and working hours are required"
      });
    }

    // 2. Find shop using ownerId
    const shop = await Shop.findOne({
      ownerId: req.user.userId
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found for this owner"
      });
    }

    const shopId = shop._id;

    // 3. Validate services belong to this shop
    const validServices = await Service.find({
      _id: { $in: services },
      shopId: shopId
    });

    if (validServices.length !== services.length) {
      return res.status(400).send({
        message: "Some services do not belong to your shop"
      });
    }

    //4. Prevent duplicate staff (same name in same shop)
    const existingStaff = await Staff.findOne({
      name,
      shopId
    });

    if (existingStaff) {
      return res.status(400).send({
        message: "Staff with this name already exists in your shop"
      });
    }
    
    //  5. Create staff
    const staff = new Staff({
      name,
      services,
      email,
      phone,
      workingHours,
      shopId
    });

    const result = await staff.save();

    res.status(201).send({
      message: "Staff created successfully",
      staff: result
    });

  } catch (error) {

    //  Unique index error
    if (error.code === 11000) {
      return res.status(400).send({
        message: "Duplicate staff entry"
      });
    }

    res.status(500).send({
      message: "Server error",
      error: error.message
    });
  }
};