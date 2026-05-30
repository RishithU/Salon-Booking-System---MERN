import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:3000/api/shop",
});

// Attach token automatically
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const createShop = async (shopData) => {
    console.log(shopData)
  const response = await API.post("/create-shop", shopData);
    console.log(response)
  return response.data;
};