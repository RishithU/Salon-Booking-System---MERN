import { useNavigate } from "react-router-dom";

const StaffInsightCard = ({ staff }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-lg border p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{staff.name}</h3>
        <p className="text-sm text-gray-500 mb-3">Performance summary for this staff member.</p>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Completed bookings:</span>{" "}
            {staff.completedBookings ?? 0}
          </p>
          <p>
            <span className="font-semibold">Average rating:</span>{" "}
            {staff.averageRating ?? 0}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/owner/staff/${staff.staffId}`)}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
      >
        View Staff Details
      </button>
    </div>
  );
};

export default StaffInsightCard;
