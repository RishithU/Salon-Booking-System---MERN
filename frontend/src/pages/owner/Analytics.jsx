import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import AnalyticsOverview from "../../components/owner/AnalyticsOverview";
import StaffInsightCard from "../../components/owner/StaffInsightCard";
import CustomerInsightsCard from "../../components/owner/CustomerInsightsCard";
import {
  getOverviewAnalytics,
  getStaffAnalytics,
  getCustomerInsights,
} from "../../api/analytics";

const Analytics = () => {
  const [overview, setOverview] = useState(null);
  const [staff, setStaff] = useState([]);
  const [customerInsights, setCustomerInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [overviewData, staffData, customerData] = await Promise.all([
          getOverviewAnalytics(),
          getStaffAnalytics(),
          getCustomerInsights(),
        ]);

        setOverview(overviewData);
        setStaff(staffData);
        setCustomerInsights(customerData);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-lg border">
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-500">
            Review bookings, staff performance, and customer feedback in a single view.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 shadow-lg border text-center text-xl text-gray-600">
            Loading analytics...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-10 shadow-lg border text-center text-xl text-red-600">
            {error}
          </div>
        ) : (
          <>
            <AnalyticsOverview overview={overview} />

            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              <section className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">Staff Performance</h2>
                    <p className="text-gray-500 mt-1">
                      See how your staff members are performing and manage their details.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/owner/bookings")}
                    className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
                  >
                    View all bookings
                  </button>
                </div>

                {staff.length === 0 ? (
                  <div className="rounded-3xl bg-white p-8 shadow-lg border text-gray-500">
                    No staff analytics are available yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
                    {staff.map((member) => (
                      <StaffInsightCard key={member.staffId} staff={member} />
                    ))}
                  </div>
                )}
              </section>

              <CustomerInsightsCard insights={customerInsights} />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Analytics;
