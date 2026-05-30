import BookingCard from "./BookingCard";


const BookingList = ({ bookings ,handleCompleteBooking}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      { bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          handleCompleteBooking={ handleCompleteBooking }
        />
      ))}
    </div>
  );
};

export default BookingList;