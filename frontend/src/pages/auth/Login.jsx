import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

  console.log("Login")

    const navigate = useNavigate();
    const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await API.post(
      "/auth/login",
      formData
    );

    login(
    response.data.user,
    response.data.token
    );

    

    console.log(response.data);

    alert("Login Successful");

    
        if (response.data.user.role === "owner") {

        navigate("/owner/home");

        } else {

        navigate("/customer/home");
        }

  } catch (error) {

    console.log(error);

    alert("Login Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Login
          </button>

        </form>
        <p className="text-center">
  Don't have an account?

  <a
    href="/signup"
    className="text-blue-500 ml-1"
  >
    Signup
  </a>
</p>

      </div>
    </div>
  );
};

export default Login;