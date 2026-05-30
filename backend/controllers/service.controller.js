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

    //  Handle unique index error (backup safety)
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


exports.getOwnerServices = async (request, response) => {
  try {

    // Logged-in owner id
    const ownerId = request.user.id;


    // Find owner's shop
    const shop = await Shop.findOne({ owner: ownerId });

    // If shop does not exist
    if (!shop) {
      return response.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }
    
    // Find all services belonging to this shop
    const services = await Service.find({
      shopId: shop._id,
    })
      
   // console.log(services)
    return response.status(200).json({
      success: true,
      count: services.length,
      services,
    });

  } catch (error) {

    console.log(error);

    return response.status(500).json({
      success: false,
      message: "Failed to fetch owner services",
      error: error.message,
    });
  }
};


exports.searchServices = async (req, res) => {

  try {

    // GET SEARCH QUERY

    const { query } = req.query;

    // VALIDATION

    if (!query) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    // FIND SERVICES

    const services = await Service.find({

      name: {
        $regex: query,
        $options: "i"
      }

    })

    // POPULATE SHOP DETAILS

    .populate("shopId", "name");

    // SEND RESPONSE

    res.status(200).json(services);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


exports.getServiceDetails =async (req, res) => {

  try {

    // GET SERVICE ID

    const { serviceId } = req.params;

    // FIND SERVICE

    const service =
    await Service.findById(serviceId)

      .populate(
        "shopId"
      );

    // NOT FOUND

    if (!service) {

      return res.status(404).json({
        message: "Service not found"
      });

    }

    // RESPONSE

    res.status(200).json(service);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};