const StaffDetailCard = ({ staff }) => {
  console.log(staff)
  return (
    <div className="bg-white shadow-lg rounded-xl border p-6">

      <h1 className="text-3xl font-bold mb-6">
        Staff Details
      </h1>

      <div className="space-y-4">

        <p>
          <span className="font-semibold">
            Name:
          </span>{" "}
          {staff.staff.name}
        </p>

        
        <p>
          <span className="font-semibold">
            Email:
          </span>{" "}
          {staff.staff.email}
        </p>

        <p>
          <span className="font-semibold">
            Total Bookings:
          </span>{" "}
          {staff.analytics.totalBookings}
        </p>

        <p>
          <span className="font-semibold">
            Completed Bookings:
          </span>{" "}
          {staff.analytics.completedBookings}
        </p>

        <p>
          <span className="font-semibold">
            Cancelled Bookings:
          </span>{" "}
          {staff.analytics.cancelledBookings}
        </p>

        
        <p>
          <span className="font-semibold">
            Rating:
          </span>{" "}
          {staff.analytics.averageRating}
        </p>

        <div>
          <h2 className="font-semibold mb-2">
            Reviews
          </h2>

          <ul className="list-disc ml-6">
            {staff.staff.reviews?.map((review) => (
              <li key={review._id}>
                {review.comment}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">
            Services
          </h2>

          <ul className="list-disc ml-6">
            {staff.staff.services?.map((service) => (
              <li key={service._id}>
                {service.name}
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

export default StaffDetailCard;