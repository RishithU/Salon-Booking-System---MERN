const calculateOverviewMetrics = (bookings) => {

  // CURRENT DATE
  const currentDate = new Date();

  // CURRENT MONTH START
  const currentMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

console.log("Current Month ",currentMonthStart)

  // NEXT MONTH START
  const nextMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );

console.log("Next Month ",nextMonthStart)

  // METRICS OBJECT
  const metrics = {
    totalRevenue: 0,
    totalBookings: 0,
    totalCompletedBookings: 0,
    totalCancelledBookings: 0
  };

  // LOOP THROUGH BOOKINGS
  bookings.forEach((booking) => {

    
    // CHECK CURRENT MONTH
    const isCurrentMonthBooking =
      booking.startTime >= currentMonthStart &&
      booking.endTime < nextMonthStart;

    console.log(isCurrentMonthBooking)

    // SKIP IF NOT CURRENT MONTH
    if (!isCurrentMonthBooking) {
      return;
    }

    // TOTAL BOOKINGS
    metrics.totalBookings++;

    // COMPLETED BOOKINGS
    if (booking.status === "completed") {

      metrics.totalCompletedBookings++;
      
      metrics.totalRevenue += booking.serviceId.price;
    }

    // CANCELLED BOOKINGS
    if (booking.status === "cancelled") {
      metrics.totalCancelledBookings++;
    }

  });

  return metrics;
};

module.exports = {
  calculateOverviewMetrics
};

