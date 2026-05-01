const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller");

// Middlewares for authentication
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/create-service",protect,
    authorize("owner"),
    serviceController.createService);

module.exports = router;