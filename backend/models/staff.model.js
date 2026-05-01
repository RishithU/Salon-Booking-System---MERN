const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true
    },

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
      }
    ],

    //  CONTACT DETAILS
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
      sparse: true // allows multiple null values
    },

    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please use a valid 10-digit phone number"],
      sparse: true
    },

    workingHours: {
      start: {
        type: Number,
        required: true
      },
      end: {
        type: Number,
        required: true
      }
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

//  Prevent invalid working hours
staffSchema.pre("save", function () {
  console.log()
  if (this.workingHours.start >= this.workingHours.end) {
    throw new Error("Start time must be before end time");
  }
});

module.exports = mongoose.model("Staff", staffSchema);