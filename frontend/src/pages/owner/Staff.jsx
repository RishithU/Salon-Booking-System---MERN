import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import StaffList from "../../components/owner/StaffList";

import { getOwnerStaff } from "../../api/staff";

const OwnerStaffPage = () => {

  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchStaff = async () => {

      try {

        const data = await getOwnerStaff();

        console.log(data);

        setStaffList(data);

      } catch (err) {

        setError("Failed to fetch staff");

      } finally {

        setLoading(false);
      }
    };

    fetchStaff();

  }, []);


  if (loading) {
    return <h1 className="p-5">Loading...</h1>;
  }

  if (error) {
    return (
      <h1 className="p-5 text-red-500">
        {error}
      </h1>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Staff Members
      </h1>

       <div className="flex justify-between items-center mb-6">

                

                <button
                    onClick={() => navigate("/owner/add-staff")}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                    Add Staff
                </button>

        </div>
      

      <StaffList staffList={staffList} />

    </div>
  );
};

export default OwnerStaffPage;