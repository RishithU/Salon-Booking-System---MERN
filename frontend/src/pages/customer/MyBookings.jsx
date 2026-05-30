import { useEffect, useState }
from "react";

import { useAuth }
from "../../context/AuthContext";

import {
  getCustomerBookings
}
from "../../api/Booking";

import {
  cancelBooking
}
from "../../api/Booking";

import BookingCardList
from "../../components/customer/BookingList";

const MyBookings = () => {

  // TOKEN

  const { token } = useAuth();

  // BOOKINGS STATE

  const [bookings, setBookings]
  = useState([]);

  // LOADING STATE

  const [loading, setLoading]
  = useState(true);

  // CANCEL bOOKING
  const handleCancelBooking =
async (bookingId) => {

  try {

    // CONFIRMATION

    const confirmCancel =
    window.confirm(

      "Are you sure you want to cancel this booking?"

    );

    if (!confirmCancel) {

      return;

    }

    // API CALL

    await cancelBooking(
      bookingId,
      token
    );

    // UPDATE UI

    const updatedBookings =
    bookings.map((booking) => {

      if (
        booking._id === bookingId
      ) {

        return {

          ...booking,

          status: "cancelled"

        };

      }

      return booking;

    });

    setBookings(updatedBookings);

    alert(
      "Booking cancelled successfully"
    );

  }

  catch (error) {

    console.log(error);

    alert(

      error.response?.data?.message ||

      "Cancellation failed"

    );

  }

};

  // FETCH BOOKINGS

  useEffect(() => {

    const fetchBookings =
    async () => {

      try {

        const data = await getCustomerBookings();
        console.log(data)
        setBookings(data);

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, [token]);

  // LOADING

  if (loading) {

    return (

      <div className="p-10">

        <h1 className="text-2xl">
          Loading...
        </h1>

      </div>

    );

  }

  return (

    <div className="p-10">

      {/* TITLE */}

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        My Bookings
      </h1>

      {/* EMPTY */}

      {
        bookings.length === 0 && (

          <p className="text-lg">

            No bookings found

          </p>

        )
      }

      {/* BOOKINGS */}

      <BookingCardList

        bookings={bookings}

        handleCancelBooking={
            handleCancelBooking
        }

        />

    </div>

  );

};

export default MyBookings;