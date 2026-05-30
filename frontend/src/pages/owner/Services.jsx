import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import ServiceList from "../../components/owner/ServiceList";

import { getOwnerServices } from "../../api/Services";

const OwnerServicePage = () => {

  const navigate = useNavigate();

  const [serviceList, setServiceList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchService = async () => {

      try {

        const data = await getOwnerServices();

        console.log(data);

        setServiceList(data);

      } catch (err) {

        setError("Failed to fetch staff");

      } finally {

        setLoading(false);
      }
    };

    fetchService();

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
        Services
      </h1>

       <div className="flex justify-between items-center mb-6">

                

                <button
                    onClick={() => navigate("/owner/add-service")}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                    Add Service
                </button>

        </div>
      

      <ServiceList serviceList={serviceList} />

    </div>
  );
};

export default OwnerServicePage;
