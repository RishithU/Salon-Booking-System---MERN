import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:3000/api/review",
});

// Attach token automatically
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// Create Review
export const createReview = async (reviewData) => {
  const response = await API.post("/create-review", reviewData);
  return response.data;
};





