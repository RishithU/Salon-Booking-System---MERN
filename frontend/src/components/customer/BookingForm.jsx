const BookingForm = ({

  startTime,
  setStartTime,

  handleBooking,

  loading

}) => {

  return (

    <div
      className="
        bg-white
        shadow-lg
        rounded-lg
        p-8
        max-w-xl
      "
    >

      {/* TITLE */}

      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Book Appointment
      </h1>

      {/* START TIME */}

      <div className="mb-6">

        <label
          className="
            block
            text-lg
            font-semibold
            mb-2
          "
        >
          Select Start Time
        </label>

        <input

          type="datetime-local"

          value={startTime}

          onChange={(e) =>
            setStartTime(e.target.value)
          }

          className="
            border
            border-gray-400
            px-4
            py-3
            rounded
            w-full
          "
        />

      </div>

      {/* BUTTON */}

      <button

        onClick={handleBooking}

        disabled={loading}

        className="
          bg-green-600
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-green-700
        "
      >

        {
          loading
            ? "Booking..."
            : "Confirm Booking"
        }

      </button>

    </div>

  );

};

export default BookingForm;