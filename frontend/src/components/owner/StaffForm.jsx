
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createStaff } from "../../api/addstaff";
import { getOwnerServices } from "../../api/Services";

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

    const [ownerServices, setOwnerServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [servicesError, setServicesError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOwnerServices = async () => {
            try {
                setServicesLoading(true);
                const data = await getOwnerServices();
                setOwnerServices(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error);
                setServicesError("Failed to load services");
            } finally {
                setServicesLoading(false);
            }
        };

        fetchOwnerServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

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

    const handleServiceToggle = (serviceId) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(serviceId)
                ? prev.services.filter((id) => id !== serviceId)
                : [...prev.services, serviceId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.services.length === 0) {
            alert("Please select at least one service");
            return;
        }

        try {
            setLoading(true);

            const response = await createStaff(formData);

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

                <div className="mb-5">
                    <label className="block mb-2 font-medium">
                        Services
                    </label>

                    {servicesLoading ? (
                        <p className="text-sm text-gray-500">Loading services...</p>
                    ) : servicesError ? (
                        <p className="text-sm text-red-500">{servicesError}</p>
                    ) : ownerServices.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No services are available for your shop yet.
                        </p>
                    ) : (
                        <div className="border rounded-lg p-4 space-y-2">
                            {ownerServices.map((service) => (
                                <label
                                    key={service._id}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.services.includes(service._id)}
                                        onChange={() => handleServiceToggle(service._id)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <span className="text-gray-700">{service.name}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    <p className="text-sm text-gray-500 mt-2">
                        Select the services this staff member can handle.
                    </p>
                </div>

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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    {loading ? "Adding Staff..." : "Add Staff"}
                </button>
            </form>
        </div>
    );
};

export default StaffForm;

