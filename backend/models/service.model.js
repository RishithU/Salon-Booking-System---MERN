const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    duration: {
      type: Number, // in minutes
      required: true,
      min: 1
    },

    description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);


serviceSchema.index({ name: 1, shopId: 1 }, { unique: true });

module.exports = mongoose.model("Service", serviceSchema);