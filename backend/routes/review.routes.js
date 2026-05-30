const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");

// Middlewares for authentication
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/create-review",protect,
    authorize("customer"), reviewController.createReview);

module.exports = router;