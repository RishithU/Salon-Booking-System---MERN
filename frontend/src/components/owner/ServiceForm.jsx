/*import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { addService } from "../../api/Services";

const AddServiceForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

    const handleSubmit = async (e) => {
     e.preventDefault();
    
            try {
    
                setLoading(true);
    
                const response = await addService(formData);
    
                console.log(response);
    
                alert("Services Added Successfully");
    
                navigate("/owner/services");
    
            } catch (error) {
    
                console.log(error);
    
                alert(
                    error?.response?.data?.message ||
                    "Failed to add staff"
                );
    
            } finally {
    
                setLoading(false);
            }
    }
    

  

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-4">
          Add Service
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddServiceForm;*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addService } from "../../api/Services";

const ServiceForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        duration: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // HANDLE SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await addService(formData);

            console.log(response);

            alert("Service Added Successfully");

            navigate("/owner/services");

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Failed to add service"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl"
            >

                <h2 className="text-3xl font-bold mb-8">
                    Add Service
                </h2>

                {/* SERVICE NAME */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Service Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter service name"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />

                </div>

                {/* PRICE */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter service price"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />

                </div>

                {/* DURATION */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Duration (Minutes)
                    </label>

                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Enter duration"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />

                </div>

                {/* DESCRIPTION */}
                <div className="mb-6">

                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter service description"
                        rows="4"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    {
                        loading
                            ? "Adding Service..."
                            : "Add Service"
                    }
                </button>

            </form>

        </div>
    );
};

export default ServiceForm;