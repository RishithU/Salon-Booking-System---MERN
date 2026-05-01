const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff.controller");

// Middlewares for authentication
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/add-staff",protect,
    authorize("owner"),
    staffController.addStaff);

module.exports = router;