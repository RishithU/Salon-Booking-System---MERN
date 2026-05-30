import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Get all bookings
export const getOwnerBookings = async () => {
  const response = await API.get("/dashboard/booking/overview");
    console.log(response.data.data.bookings)
  return response.data.data.bookings;
};

// Get booking detail
export const getBookingById = async (id) => {
  const response = await API.get(`/dashboard/booking/${id}`);
    console.log(response.data.booking)
  return response.data.booking;
};

export const createBooking = async (bookingData) => {
  const response = await API.post("/booking/create-booking",bookingData);
  console.log(response)
  return response.data;

};

export const getCustomerBookings = async (token) => {

  const response = await API.get("/booking/customer");
  console.log(response)
  return response.data;

};

export const cancelBooking = async (bookingId) => {

  const response = await API.patch(`/booking/${bookingId}/cancel-booking`);
  console.log(response)
  return response.data;

};

export const completeBooking = async (bookingId) => {

  const response = await API.patch(`/booking/${bookingId}/complete-booking`);
  console.log(response)
  return response.data;

};