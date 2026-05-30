const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking.controller");

// Middlewares for authentication
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/create-booking",protect,
    authorize("customer"),
    bookingController.createBooking);

router.get("/customer",protect,
    authorize("customer"),
    bookingController.getCustomerBookings);

router.patch("/:id/complete-booking",protect,
    authorize("owner"),bookingController.completeBooking);

router.patch("/:id/cancel-booking",protect,
    authorize("customer"),bookingController.cancelBooking);

module.exports = router;