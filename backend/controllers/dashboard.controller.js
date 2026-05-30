const dashboardService = require("../services/dashboard.services");
const mongoose = require("mongoose");
const Booking = require("../models/booking.model");
const Review= require("../models/review.model");
const Staff= require("../models/staff.model");
const Shop= require("../models/shop.model");

const overview = async (req, res) => {
  try {

    const ownerId = req.user._id;

    const dashboardData =
      await dashboardService.getOverviewDashboard(ownerId)

    return res.status(200).json({
      success: true,
      message: "Overview dashboard fetched successfully",
      data: dashboardData
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const bookingDetail = async (req, res) => {

  try {

    const { _id } = req.params;

    // VALIDATE OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(_id)) {

      return res.status(400).json({
        success: false,
        message: "Invalid booking ID"
      });

    }

    // FETCH BOOKING
    const booking = await Booking.findById(_id)

      .populate(
        "userId",
        "name email"
      )

      .populate(
        "serviceId",
        "name price duration"
      )

      .populate(
        "staffId",
        "name"
      )

      .lean();

    // BOOKING NOT FOUND
    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });

    }

    //Get REVIEW
    const review = await Review.findOne({
        bookingId: _id
    });

    // SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      message: "Booking dashboard fetched successfully",

      booking:booking,
      review:review

    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const staff = async (req, res) => {

  try {

    const ownerId = req.user._id;

    // FETCH ALL STAFF
    const staffs = await Staff.find({
      ownerId
    }).lean();

    console.log(staffs)

    // BUILD STAFF ANALYTICS
    const staffDashboardData = await Promise.all(

      staffs.map(async (staff) => {

        // COMPLETED BOOKINGS COUNT
        const completedBookings =
          await Booking.countDocuments({
            staffId: staff._id,
            status: "completed"
          });

        // FETCH REVIEWS
        const reviews = await Review.find({
          targetType: "staff",
          targetId: staff._id
        })
        .select("rating")
        .lean();

        // CALCULATE AVERAGE RATING
        let averageRating = 0;

        if (reviews.length > 0) {

          const totalRating =
            reviews.reduce((sum, review) => {
              return sum + review.rating;
            }, 0);

          averageRating =
            totalRating / reviews.length;
        }

        return {

          staffId: staff._id,

          name: staff.name,

          staff:staff,

          completedBookings,

          averageRating:
            Number(averageRating.toFixed(1))
        };

      })
    );

    return res.status(200).json({
      success: true,
      message: "Staff dashboard fetched successfully",

      data: staffDashboardData
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const staffDetail = async (req, res) => {

  try {

    const { staffId } = req.params;

    // VALIDATE STAFF ID
    if (!mongoose.Types.ObjectId.isValid(staffId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid staff ID"
      });

    }

    // FETCH STAFF
    const staff = await Staff.findOne({
      _id: staffId,
      ownerId: req.user._id
    })
    .populate("services", "name price duration")
    .lean();

    // STAFF NOT FOUND
    if (!staff) {

      return res.status(404).json({
        success: false,
        message: "Staff not found"
      });

    }

    // FETCH STAFF BOOKINGS
    const bookings = await Booking.find({
      staffId: staff._id
    })

    .populate("userId", "name email")

    .populate("serviceId", "name price duration")

    .sort({
      bookingDate: -1
    })

    .lean();

    // FETCH STAFF REVIEWS
    const reviews = await Review.find({
      targetType: "staff",
      targetId: staff._id
    })

    .populate("customerId", "name")

    .sort({
      createdAt: -1
    })

    .lean();

    // ANALYTICS VARIABLES
    let totalBookings = 0;

    let completedBookings = 0;

    let cancelledBookings = 0;

    let totalRevenueGenerated = 0;

    // BOOKINGS LOOP
    bookings.forEach((booking) => {

      totalBookings++;

      if (booking.status === "completed") {

        completedBookings++;

        totalRevenueGenerated +=
          booking.totalPrice || 0;
      }

      if (booking.status === "cancelled") {
        cancelledBookings++;
      }

    });

    // AVERAGE RATING
    let averageRating = 0;

    if (reviews.length > 0) {

      const totalRating =
        reviews.reduce((sum, review) => {
          return sum + review.rating;
        }, 0);

      averageRating =
        totalRating / reviews.length;
    }

    // FINAL RESPONSE
    return res.status(200).json({

      success: true,

      message:
        "Staff detail dashboard fetched successfully",

      data: {

        // STAFF INFO
        staff,

        // ANALYTICS
        analytics: {

          totalBookings,

          completedBookings,

          cancelledBookings,

          totalRevenueGenerated,

          averageRating:
            Number(averageRating.toFixed(1))
        },

       
        bookings,

        reviews
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const customerInsights = async (req, res) => {

  try {
    
    const ownerId = req.user.userId;
    // FETCH OWNER SHOP
    const shop = await Shop.findOne({ ownerId });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found"
      });
    }

    // FETCH SHOP REVIEWS
    const reviews = await Review.find({
      targetType: "shop",
      targetId: shop._id
    })

    .populate(
      "customerId",
      "name email"
    )

    .populate(
      "bookingId"
    )

    .sort({
      createdAt: -1
    })

    .lean();

    // ANALYTICS
    const totalReviews = reviews.length;

    let averageRating = 0;

    if (totalReviews > 0) {

      const totalRating =
        reviews.reduce((sum, review) => {
          return sum + review.rating;
        }, 0);

      averageRating =
        totalRating / totalReviews;
    }

    // RESPONSE
    return res.status(200).json({

      success: true,

      message:
        "Customer insights dashboard fetched successfully",

      data: {

        totalReviews,

        averageRating:
          Number(averageRating.toFixed(1)),

        reviews
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  
    overview,
    bookingDetail,
    staff,
    staffDetail,
    customerInsights

};