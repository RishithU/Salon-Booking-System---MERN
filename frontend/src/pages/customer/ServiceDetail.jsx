import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import { useAuth }
from "../../context/AuthContext";

import { getServiceDetails } from "../../api/Services";

import ServiceDetailCard
from "../../components/customer/ServiceDetailCard";

const ServiceDetail = () => {

  // GET SERVICE ID

  const { serviceId } = useParams();

  // TOKEN

  const { token } = useAuth();

  // SERVICE STATE

  const [service, setService]
  = useState(null);

  // LOADING STATE

  const [loading, setLoading]
  = useState(true);

  // FETCH SERVICE

  useEffect(() => {

    const fetchService =
    async () => {

      try {

        const data =await getServiceDetails(serviceId);
        console.log(data)
        setService(data);

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

    fetchService();

  }, [serviceId, token]);

  // LOADING

  if (loading) {

    return (

      <div className="p-10">

        <h1 className="text-2xl">
          Loading...
        </h1>

      </div>

    );

  }

  // SAFETY CHECK

  if (!service) {

    return (

      <div className="p-10">

        <h1 className="text-2xl">
          Service Not Found
        </h1>

      </div>

    );

  }

  return (

    <div className="p-10">

      <ServiceDetailCard
        service={service}
      />

    </div>

  );

};

export default ServiceDetail;