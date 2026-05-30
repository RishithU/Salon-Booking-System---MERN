const Booking = require("../models/booking.model");
const Service = require("../models/service.model");
const Staff = require("../models/staff.model");

const { calculateEndTime } = require("../utils/endtime");

exports.createBooking = async (req, res) => {
  try {
        const userId=req.user.userId;
        const { shopId, serviceId, startTime } = req.body;
        const user = req.user;
        console.log("USER:",req.user)
        // Step-by-step implementation will go here
        // Obtaiining all service
        const service = await Service.findById(serviceId);

        if (!service) {
        return res.status(404).json({ message: "Service not found" });
        }

        console.log("Services :" ,service)

        const newStart = new Date(startTime);
        const newEnd = calculateEndTime(newStart, service.duration);

        // Eligible staff from staff table
        const eligibleStaff = await Staff.find({
        shopId,
        services: serviceId
        });

        if (eligibleStaff.length === 0) {
        return res.status(400).json({ message: "No staff available for this service" });
        }

        console.log("Eligible Staff :" ,eligibleStaff)
        /* Available staff by iterating on booking table for each staff in
             eligible staff
             */

        /* 
                OVERLAPPING 
            if newstart<present_end && 
            Find bookings of this staff that overlap with requested time”

                If result exists → staff NOT available
                If empty → staff available

        */

        const availableStaff = [];
        for (let staff of eligibleStaff) {
            const conflict = await Booking.findOne({
                staffId: staff._id,
                status: "booked",
                startTime: { $lt: newEnd },
                endTime: { $gt: newStart }
            });
            if (!conflict) {
                availableStaff.push(staff);
            }
        }

        // No availability
        if (availableStaff.length === 0) {
            return res.status(400).json({ message: "No staff available at this time" });
        }
        
        console.log("Available Staff :" , availableStaff)
        // selection staff (logic pending..... as of now FIRST one)
        const selectedStaff = availableStaff[0];

        // Concurency check
        const finalConflict = await Booking.findOne({
          staffId: selectedStaff._id,
          status: "booked",
          startTime: { $lt: newEnd },
          endTime: { $gt: newStart }
        });

        if (finalConflict) {
              return res.status(400).json({ message: "Slot just got booked. Try again." });
        }
        console.log(finalConflict)
       // Make Booking 
        const booking = await Booking.create({
          userId,
          shopId,
          serviceId,
          staffId: selectedStaff._id,
          startTime: newStart,
          endTime: newEnd
        });

        res.status(201).json({
            message: "Booking successful",
            booking
        });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const user = req.user;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 1. Already completed/cancelled check
    if (booking.status !== "booked") {
      return res.status(400).json({
        message: "Booking cannot be marked as completed"
      });
    }

    // 2. Time validation (important)
    const now = new Date();

    if (now < booking.startTime) {
      return res.status(400).json({
        message: "Cannot complete booking before it starts"
      });
    }

    // 3. Authorization
    // Case  Owner
     if (user.role === "owner") {
      // Check ownership
      const shop = await require("../models/shop.model").findById(booking.shopId);

      if (!shop || shop.ownerId.toString() !== user.userId) {
        return res.status(403).json({ message: "Not authorized" });
      }
    }

    // Case : Customer → not allowed
    else {
      return res.status(403).json({
        message: "Customers cannot mark booking as completed"
      });
    }

    // 4. Mark completed
    booking.status = "completed";
    await booking.save();

    res.status(200).json({
      message: "Booking marked as completed",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.userId;

    // 1. Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2. Authorization check
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    // 3. Check status
    if (booking.status !== "booked") {
      return res.status(400).json({ message: "Booking cannot be cancelled" });
    }

    // 4. Time validation
    const now = new Date();

    if (now >= booking.startTime) {
      return res.status(400).json({
        message: "Cannot cancel booking after it has started"
      });
    }

    // 5. Cancel booking
    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomerBookings =async (req, res) => {

  try {

    // CURRENT USER

    const userId = req.user.userId;

    // FIND BOOKINGS

    const bookings =
    await Booking.find({

      userId

    })

    .populate(
      "serviceId",
      "name price duration"
    )

    .populate(
      "shopId",
      "name"
    )

    .sort({
      startTime: -1
    });

    // RESPONSE

    res.status(200).json(bookings);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};