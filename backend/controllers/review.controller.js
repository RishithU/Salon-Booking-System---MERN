const Review = require("../models/review.model");
const Booking = require("../models/booking.model");

exports.createReview = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      bookingId,
      targetType,
      targetId,
      rating,
      comment
    } = req.body;

    // Validate target type
    if (!["staff", "shop"].includes(targetType)) {
      return res.status(400).json({ message: "Invalid target type" });
    }

    // Fetch booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ownership check
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not your booking" });
    }

    // Completion check 🔥
    if (booking.status !== "completed") {
      return res.status(400).json({
        message: "You can review only after completion"
      });
    }

    // Strict mapping validation 🔥
    if (
      (targetType === "staff" &&
        booking.staffId.toString() !== targetId) ||
      (targetType === "shop" &&
        booking.shopId.toString() !== targetId)
    ) {
      return res.status(400).json({
        message: "Target does not match booking"
      });
    }

    // Prevent duplicate (extra safety)
    const existing = await Review.findOne({
      bookingId,
      targetType
    });

    if (existing) {
      return res.status(400).json({
        message: `${targetType} review already exists`
      });
    }

    //  Create review
    const review = await Review.create({
      bookingId,
      customerId: userId,
      targetType,
      targetId,
      rating,
      comment
    });

    res.status(201).json({
      message: `${targetType} review added`,
      review
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};