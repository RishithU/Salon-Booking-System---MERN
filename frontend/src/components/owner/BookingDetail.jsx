const BookingDetailCard = ({ booking }) => {
    const isoStr = booking.startTime;
            const dateObj = new Date(isoStr);

            // Extract Date: YYYY-MM-DD
            const date = dateObj.toISOString().split('T')[0];

            // Extract Time: HH:MM:SS
            const time = dateObj.toISOString().split('T')[1].split('.')[0];
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border">
      <h1 className="text-3xl font-bold mb-5">
        Booking Details
      </h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">Booking ID:</span>{" "}
          {booking._id}
        </p>

        <p>
          <span className="font-semibold">Customer:</span>{" "}
          {booking.userId.name}
        </p>

        <p>
          <span className="font-semibold">Service:</span>{" "}
          {booking.serviceId.name}
        </p>

        <p>
          <span className="font-semibold">Staff:</span>{" "}
          {booking.staffId.name}
        </p>

        <p>
          <span className="font-semibold">Date:</span>{" "}
          {date}
        </p>
        
        <p>
          <span className="font-semibold">Start Time:</span>{" "}
          {time}
        </p>

        <p>
          <span className="font-semibold">Status:</span>{" "}
          {booking.status}
        </p>

        <p>
          <span className="font-semibold">Payment:</span>{" "}
          ₹{booking.serviceId.price}
        </p>
      </div>
    </div>
  );
};

export default BookingDetailCard;