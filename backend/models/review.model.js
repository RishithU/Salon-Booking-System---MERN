const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  targetType: {
    type: String,
    enum: ["staff", "shop"],
    required: true
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "targetType"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  comment: {
    type: String,
    trim: true
  }

}, { timestamps: true });


// Prevent duplicate review per target
reviewSchema.index(
  { bookingId: 1, targetType: 1 },
  { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);