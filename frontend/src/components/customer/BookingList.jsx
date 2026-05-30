import BookingCard
from "./BookingCard";

const BookingCardList = ({

  bookings,

  handleCancelBooking

}) => {

  return (

    <div
      className="
        grid
        grid-cols-1
        gap-6
      "
    >

      {

        bookings.map((booking) => (

          <BookingCard

            key={booking._id}

            booking={booking}

            handleCancelBooking={
              handleCancelBooking
            }

          />

        ))

      }

    </div>

  );

};

export default BookingCardList;