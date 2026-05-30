import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getOverviewAnalytics = async () => {
  const response = await API.get("/dashboard/booking/overview");
  return response.data.data;
};

export const getStaffAnalytics = async () => {
  const response = await API.get("/dashboard/staff_overview");
  return response.data.data;
};

export const getCustomerInsights = async () => {
  const response = await API.get("/dashboard/customerInsights");
  return response.data.data;
};
