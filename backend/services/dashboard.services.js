const mongoose = require("mongoose");
const Booking = require("../models/booking.model");
const Review= require("../models/review.model");
const Staff= require("../models/staff.model");


const {
  calculateOverviewMetrics
} = require("../utils/dashboard.utils");

const getOverviewDashboard = async (ownerId) => {

  // FETCH OWNER BOOKINGS
  const bookings = await Booking.find({
    ownerId
  })
  .populate("userId", "name email")
  .populate("serviceId", "name price")
  .populate("staffId", "name")
  .sort({ bookingDate: -1 })
  .lean();

  // CALCULATE METRICS
  const metrics =
    calculateOverviewMetrics(bookings);

  // RETURN FINAL RESPONSE
  return {
    bookings,

    totalRevenue: metrics.totalRevenue,

    totalBookings: metrics.totalBookings,

    totalCompletedBookings:
      metrics.totalCompletedBookings,

    totalCancelledBookings:
      metrics.totalCancelledBookings
  };
};


module.exports = {
  getOverviewDashboard
};