import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getBookingById } from "../../api/booking";

import BookingDetailCard from "../../components/owner/BookingDetail";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);

        setBooking(data);
      } catch (err) {
        setError("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <h1 className="p-5">Loading...</h1>;
  }

  if (error) {
    return <h1 className="p-5 text-red-500">{error}</h1>;
  }

  return (
    <div className="p-6">
      <BookingDetailCard booking={booking} />
    </div>
  );
};

export default BookingDetailsPage;