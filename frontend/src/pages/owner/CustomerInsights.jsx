import { useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { getCustomerInsights } from "../../api/analytics";

const CustomerInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const data = await getCustomerInsights();
        setInsights(data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load customer insights."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8 p-6">
        <div className="rounded-3xl bg-white p-8 shadow-lg border">
          <h1 className="text-4xl font-bold">Customer Insights</h1>
          <p className="mt-2 text-gray-500">
            Detailed customer feedback and review analytics for your shop.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 shadow-lg border text-center text-xl text-gray-600">
            Loading customer insights...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-10 shadow-lg border text-center text-xl text-red-600">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-wide text-gray-500">Total reviews</p>
                <p className="mt-4 text-4xl font-semibold text-gray-900">{insights.totalReviews ?? 0}</p>
                <p className="mt-2 text-sm text-gray-500">Reviews submitted for your shop.</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <p className="text-sm uppercase tracking-wide text-gray-500">Average rating</p>
                <p className="mt-4 text-4xl font-semibold text-gray-900">{insights.averageRating ?? 0}</p>
                <p className="mt-2 text-sm text-gray-500">Average rating based on customer feedback.</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Latest Reviews</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Read the most recent feedback from your customers.
                  </p>
                </div>
              </div>

              {insights.reviews?.length === 0 ? (
                <p className="mt-6 text-gray-500">No reviews are available yet.</p>
              ) : (
                <div className="mt-6 space-y-4">
                  {insights.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="rounded-3xl border border-gray-200 bg-gray-50 p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-semibold text-gray-900">{review.customerId?.name || "Customer"}</p>
                        </div>
                        <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                          {review.rating ?? "-"} / 5
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-700">{review.comment || "No comment provided."}</p>
                      <p className="mt-3 text-xs text-gray-500">
                        Booking: {review.bookingId?._id || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CustomerInsights;
