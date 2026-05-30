import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { staffDetail } from "../../api/staff";

import StaffDetailCard from "../../components/owner/StaffDetail";

const StaffDetailsPage = () => {

  const { staffId } = useParams();
  console.log(staffId)

  const [staff, setStaff] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchStaff = async () => {

      try {
        
        const data = await staffDetail(staffId);

        console.log("Data:" ,data);

        setStaff(data);

      } catch (err) {

        setError("Failed to fetch staff details");

      } finally {

        setLoading(false);
      }
    };

    fetchStaff();

  }, [staffId]);


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

      <StaffDetailCard staff={staff} />

    </div>
  );
};

export default StaffDetailsPage;