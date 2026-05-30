import { useState } from "react";
import API from "../../api/axios";

const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "customer",
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
        "/auth/signup",
        formData
      );

      console.log(response.data);

      alert("Signup Successful");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="customer">
              Customer
            </option>

            <option value="owner">
              Owner
            </option>
          </select>

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Signup
          </button>

        </form>
        <p className="text-center">
                 Already have an account?

                    <a
                        href="/login"
                        className="text-blue-500 ml-1"
                    >
                    Login
                     </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;