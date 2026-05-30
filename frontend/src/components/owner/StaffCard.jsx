import { useNavigate } from "react-router-dom";

const StaffCard = ({ staff }) => {

  const navigate = useNavigate();
  console.log(staff)
  return (
    <div className="bg-white rounded-xl shadow-md border p-5">

      <h2 className="text-2xl font-bold mb-3">
        {staff.name}
      </h2>


      <p>
        <span className="font-semibold">
          Completed Bookings:
        </span>{" "}
        {staff.completedBookings}
      </p>

      <p>
        <span className="font-semibold">
          Average Rating:
        </span>{" "}
        {staff.averageRating}
      </p>

      <button
        onClick={() =>
          navigate(`/owner/staff/${staff.staffId}`)
        }
        className="mt-5 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        View Details
      </button>

    </div>
  );
};

export default StaffCard;