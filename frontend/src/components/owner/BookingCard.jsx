import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { completeBooking } from "../../api/Booking";


const BookingCard = ({ booking, handleCompleteBooking }) => {
     const isoStr = booking.startTime;
            const dateObj = new Date(isoStr);

            // Extract Date: YYYY-MM-DD
            const date = dateObj.toISOString().split('T')[0];

            // Extract Time: HH:MM:SS
            const time = dateObj.toISOString().split('T')[1].split('.')[0];
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border">
      <h2 className="text-xl font-semibold mb-2">
        {booking.userId.name}
      </h2>

      <p>
        <span className="font-medium">Service:</span>{" "}
        {booking.serviceId.name}
      </p>

      <p>
        <span className="font-medium">Staff:</span>{" "}
        {booking.staffId.name}
      </p>

      <p>
        <span className="font-medium">Date:</span>{" "}
        {date}
      </p>

      <p>
        <span className="font-medium">Time:</span>{" "}
        {time}
      </p>

      <p>
        <span className="font-medium">Status:</span>{" "}
        {booking.status}
        
      </p>

      {

              booking.status === "booked" && (

              <button

                onClick={() =>
                  handleCompleteBooking(
                    booking._id
                  )
                }

                className="
                  bg-green-600
                  text-white
                  px-5
                  py-2
                  rounded
                  hover:bg-green-700
                "
              >
                Mark Completed
              </button>

            )

          }

      <button
        onClick={() =>
          navigate(`/owner/bookings/${booking._id}`)
        }
        className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        View Details
      </button>
    </div>
  );
};

export default BookingCard;