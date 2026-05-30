import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/staff"
});

export const createStaff = async (staffData) => {

    const token = localStorage.getItem("token");

    const response = await API.post(
        "/add-staff",
        staffData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log(response)
    return response.data;
};