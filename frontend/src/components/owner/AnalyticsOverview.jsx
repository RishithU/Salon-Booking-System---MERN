import { useNavigate } from "react-router-dom";

const AnalyticsOverview = ({ overview }) => {
  const navigate = useNavigate();

  if (!overview) return null;

  const stats = [
    {
      label: "Total Revenue",
      value: overview.totalRevenue ?? 0,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Total Bookings",
      value: overview.totalBookings ?? 0,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Completed",
      value: overview.totalCompletedBookings ?? 0,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Cancelled",
      value: overview.totalCancelledBookings ?? 0,
      color: "text-red-600 bg-red-50",
    },
  ];

  const latestBookings = overview.bookings?.slice(0, 3) || [];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.color}`}>
              {item.label}
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Recent Bookings</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your latest bookings at a glance.
            </p>
          </div>
          <button
            onClick={() => navigate("/owner/bookings")}
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            View all bookings
          </button>
        </div>

        {latestBookings.length === 0 ? (
          <p className="mt-6 text-gray-500">No bookings available yet.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {latestBookings.map((booking) => (
              <div key={booking._id} className="rounded-3xl border border-gray-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-semibold">{booking.userId?.name || "Unknown"}</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                    {booking.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Service:</span> {booking.serviceId?.name || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold">Staff:</span> {booking.staffId?.name || "Unassigned"}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> {booking.totalPrice ? `₹${booking.totalPrice}` : "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalyticsOverview;
