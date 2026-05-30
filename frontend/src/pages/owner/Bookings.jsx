import { useEffect, useState } from "react";

import BookingList from "../../components/owner/BookingList";

import { getOwnerBookings } from "../../api/Booking";
import { completeBooking } from "../../api/Booking";

const OwnerBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getOwnerBookings();
       // console.log(data)
        setBookings(data);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <h1 className="p-5">Loading...</h1>;
  }

  if (error) {
    return <h1 className="p-5 text-red-500">{error}</h1>;
  }

  const handleCompleteBooking =
async (bookingId) => {

  try {

    // CONFIRMATION

    const confirmComplete =
    window.confirm(

      "Mark this booking as completed?"

    );

    if (!confirmComplete) {

      return;

    }

    // API CALL

    const response= await completeBooking(bookingId);
    console.log(response)
    
    // UPDATE STATE

    const updatedBookings =
    bookings.map((booking) => {

      if (
        booking._id === bookingId
      ) {

        return {

          ...booking,

          status: "completed"

        };

      }

      return booking;

    });

    setBookings(updatedBookings);

    alert(
      "Booking marked as completed"
    );

  }

  catch (error) {

    console.log(error);

    alert(

      error.response?.data?.message ||

      "Failed to complete booking"

    );

  }

};


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        All Bookings
      </h1>
      
      
      <BookingList bookings={bookings} handleCompleteBooking={handleCompleteBooking}/>
    </div>
  );
};

export default OwnerBookingsPage;