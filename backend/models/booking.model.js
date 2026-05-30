const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true
    },

    startTime: {
      type: Date,
      required: true
    },

    endTime: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);