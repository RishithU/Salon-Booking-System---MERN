const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");

// Middlewares for authentication
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/create-shop",protect,
    authorize("owner"),
    shopController.createShop);

module.exports = router;