


import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createStaff } from "../../api/addstaff";

const StaffForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        services: [],
        workingHours: {
            start: "",
            end: ""
        },
        isActive: true
    });

    const [serviceInput, setServiceInput] = useState("");

    const [loading, setLoading] = useState(false);

    // NORMAL INPUTS
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // WORKING HOURS
    const handleWorkingHoursChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [name]: Number(value)
            }
        }));
    };

    // ADD SERVICES
    const handleAddService = () => {

        if (!serviceInput.trim()) return;

        setFormData((prev) => ({
            ...prev,
            services: [...prev.services, serviceInput]
        }));

        setServiceInput("");
    };

    

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await createStaff(formData);

            console.log(response);

            alert("Staff Added Successfully");

            navigate("/owner/staff");

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Failed to add staff"
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
                    Add Staff
                </h2>

                {/* NAME */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter staff name"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />

                </div>

                {/* EMAIL */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                </div>

                {/* PHONE */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit phone number"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                </div>

                {/* SERVICES */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Services
                    </label>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            value={serviceInput}
                            onChange={(e) => setServiceInput(e.target.value)}
                            placeholder="Enter Service ID"
                            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <button
                            type="button"
                            onClick={handleAddService}
                            className="bg-black text-white px-5 rounded-lg"
                        >
                            Add
                        </button>

                    </div>

                    {/* SERVICE TAGS */}
                    <div className="flex flex-wrap gap-2 mt-4">

                        {
                            formData.services.map((service, index) => (

                                <div
                                    key={index}
                                    className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-2"
                                >

                                    <span>{service}</span>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveService(index)}
                                        className="text-red-500 font-bold"
                                    >
                                        ×
                                    </button>

                                </div>
                            ))
                        }

                    </div>

                </div>

                {/* WORKING HOURS */}
                <div className="grid grid-cols-2 gap-5 mb-6">

                    <div>

                        <label className="block mb-2 font-medium">
                            Start Hour
                        </label>

                        <input
                            type="number"
                            name="start"
                            min="0"
                            max="23"
                            value={formData.workingHours.start}
                            onChange={handleWorkingHoursChange}
                            placeholder="9"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            End Hour
                        </label>

                        <input
                            type="number"
                            name="end"
                            min="0"
                            max="23"
                            value={formData.workingHours.end}
                            onChange={handleWorkingHoursChange}
                            placeholder="18"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />

                    </div>

                </div>

                {/* ACTIVE STATUS */}
                <div className="mb-6 flex items-center gap-3">

                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                isActive: e.target.checked
                            }))
                        }
                    />

                    <label className="font-medium">
                        Staff Active
                    </label>

                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    {
                        loading
                            ? "Adding Staff..."
                            : "Add Staff"
                    }
                </button>

            </form>

        </div>
    );
};

export default StaffForm;


