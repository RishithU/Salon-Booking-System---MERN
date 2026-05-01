// controllers/shop.controller.js

const Shop = require("../models/shop.model");

exports.createShop = async (req, res) => {
  try {
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