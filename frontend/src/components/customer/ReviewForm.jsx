import { useEffect, useState } from "react";
import { createReview } from "../../api/review";

const ReviewForm = ({ booking, onClose, onSuccess }) => {
  const [targetType, setTargetType] = useState("shop");
  const [targetId, setTargetId] = useState(booking?.shopId?._id || booking?.shopId || "");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!booking) return;

    const shopId = booking.shopId?._id || booking.shopId;
    const staffId = booking.staffId?._id || booking.staffId;

    if (targetType === "shop") {
      setTargetId(shopId || "");
    } else {
      setTargetId(staffId || "");
    }
  }, [booking, targetType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!booking?._id) {
      setError("Booking data is missing.");
      return;
    }

    if (!targetId) {
      setError("Please select a valid review target.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        bookingId: booking._id,
        targetType,
        targetId,
        rating,
        comment
      });

      alert("Review submitted successfully.");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit review."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  const shopName = booking.shopId?.name || booking.shopId;
  const staffName = booking.staffId?.name || booking.staffId || "Staff";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add Review</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Target</label>
            <div className="flex flex-col gap-3">
              <label className="inline-flex items-center gap-3">
                <input
                  type="radio"
                  name="targetType"
                  value="shop"
                  checked={targetType === "shop"}
                  onChange={() => setTargetType("shop")}
                />
                <span>Shop: {shopName}</span>
              </label>
              {booking.staffId && (
                <label className="inline-flex items-center gap-3">
                  <input
                    type="radio"
                    name="targetType"
                    value="staff"
                    checked={targetType === "staff"}
                    onChange={() => setTargetType("staff")}
                  />
                  <span>Staff: {staffName}</span>
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} star{value > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a review"
              rows="4"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
