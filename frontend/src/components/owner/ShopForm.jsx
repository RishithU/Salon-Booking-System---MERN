import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {createShop} from "../../api/shop";

const AddShopForm = () => {
  const navigate = useNavigate();

  
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: {
      address: "",
      city: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "address" || name === "city") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

       console.log(formData)
      const response= await createShop(formData);
       
      
       console.log(response);


      alert("Shop created successfully");

      navigate('/owner/home')
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create shop"
      );
      
      navigate('/owner/home')

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">
          Shop Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter shop name"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Address
        </label>

        <input
          type="text"
          name="address"
          value={formData.location.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          City
        </label>

        <input
          type="text"
          name="city"
          value={formData.location.city}
          onChange={handleChange}
          placeholder="Enter city"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Shop"}
        </button>

        
      </div>
    </form>
  );
};

export default AddShopForm;