import ReviewModal from "./ReviewForm";
import { useState } from "react";
const BookingCard = ({

  booking,

  handleCancelBooking

}) => {
  const [showReviewModal, setShowReviewModal] =
  useState(false);
  // STATUS COLOR

  const getStatusColor = () => {

    if (booking.status === "completed") {

      return "bg-green-200";

    }

    if (booking.status === "booked") {

      return "bg-yellow-200";

    }

    if (booking.status === "cancelled") {

      return "bg-red-200";

    }

    return "bg-gray-200";

  };

  return (

    <div
      className={`
        ${getStatusColor()}
        p-6
        rounded-lg
        shadow
      `}
    >

      {/* SERVICE */}

      <h2
        className="
          text-2xl
          font-bold
          mb-3
        "
      >
        {booking.serviceId?.name}
      </h2>

      {/* SHOP */}

      <p className="mb-2">

        Shop:
        {" "}

        {booking.shopId?.name}

      </p>

      {/* START */}

      <p className="mb-2">

        Start Time:
        {" "}

        {
          new Date(
            booking.startTime
          ).toLocaleString()
        }

      </p>

      {/* END */}

      <p className="mb-4">

        End Time:
        {" "}

        {
          new Date(
            booking.endTime
          ).toLocaleString()
        }

      </p>

      {/* STATUS */}

      <p
        className="
          font-semibold
          capitalize
          mb-4
        "
      >
        Status:
        {" "}

        {booking.status}
      </p>

      {/* CANCEL BUTTON */}

      {

        booking.status === "booked" && (

          <button

            onClick={() =>
              handleCancelBooking(
                booking._id
              )
            }

            className="
              bg-red-600
              text-white
              px-5
              py-2
              rounded
              hover:bg-red-700
            "
          >
            Cancel Booking
          </button>

        )

      }

      {booking.status === "completed" && (
        <>
          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-black text-white px-4 py-2 rounded mt-3"
          >
            Add Review
          </button>

          {showReviewModal && (
            <ReviewModal
              booking={booking}
              onClose={() => setShowReviewModal(false)}
            />
          )}
        </>
      )}

    </div>

  );

};

export default BookingCard;