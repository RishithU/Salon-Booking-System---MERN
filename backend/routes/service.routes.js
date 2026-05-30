const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller");

// Middlewares for authentication
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/create-service",protect,
    authorize("owner"),
    serviceController.createService);

router.get(
  "/getservices",
  protect,authorize("owner"),
  
  serviceController.getOwnerServices
);

router.get("/search",protect,
  authorize("customer"), 
  serviceController.searchServices);

router.get("/getservice/:serviceId",protect,
  authorize("customer"), 
  serviceController.getServiceDetails);

  
module.exports = router;