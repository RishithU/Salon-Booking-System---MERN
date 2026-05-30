import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// Get all staff
export const getOwnerStaff = async () => {

  const response = await API.get("/dashboard/staff_overview");
    console.log(response)
  return response.data.data;
};


// Get single staff
export const staffDetail = async (id) => {

  const response = await API.get(`/dashboard/staff/${id}`);
  console.log(response)
  return response.data.data;
};




