import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:3000/api/service",
});

// Attach token automatically
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// Get all services
export const getOwnerServices = async () => {

  const response = await API.get("/getservices");
    console.log(response)
  return response.data.services;
};



export const addService = async (serviceData) => {

   const token = localStorage.getItem("token");

    const response = await API.post(
        "/create-service",
        serviceData);
    console.log(response)
    return response.data;
};


export const searchServices = async (query) => {

  const response = await API.get(

    `/search?query=${query}`,

    );
    console.log(response)
  return response.data;

};

export const getServiceDetails =async (serviceId) => {
   const response = await API.get(

    `/getservice/${serviceId}`,

    );
    console.log(response)
  return response.data;

}