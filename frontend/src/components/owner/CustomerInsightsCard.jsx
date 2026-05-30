import { useNavigate } from "react-router-dom";

const CustomerInsightsCard = ({ insights }) => {
  const navigate = useNavigate();

  if (!insights) return null;

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Customer Insights</h2>
          <p className="mt-1 text-sm text-gray-500">
            View summary metrics and open the full insights dashboard.
          </p>
        </div>

        <button
          onClick={() => navigate("/owner/customer-insights")}
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          See full insights
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gray-50 p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500">Total reviews</p>
          <p className="mt-3 text-3xl font-semibold text-gray-900">{insights.totalReviews ?? 0}</p>
        </div>
        <div className="rounded-3xl bg-gray-50 p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500">Average rating</p>
          <p className="mt-3 text-3xl font-semibold text-gray-900">{insights.averageRating ?? 0}</p>
        </div>
      </div>
    </section>
  );
};

export default CustomerInsightsCard;
