import { useState, useEffect }
from "react";

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  getServiceDetails
}
from "../../api/Services";

import {
  createBooking
}
from "../../api/Booking";

import BookingForm
from "../../components/customer/BookingForm";

const BookingPage = () => {

    const navigate = useNavigate();

  // GET SERVICE ID

  const { serviceId } = useParams();

  // GET TOKEN
   const { token } = useAuth()
  // SERVICE STATE

  const [service, setService]
  = useState(null);

  // START TIME STATE

  const [startTime, setStartTime]
  = useState("");

  // LOADING

  const [loading, setLoading]
  = useState(false);

  // FETCH SERVICE DETAILS

  useEffect(() => {

    const fetchService =
    async () => {

      try {

        const data =await getServiceDetails(serviceId);

        setService(data);

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchService();

  }, [serviceId, token]);

  // HANDLE BOOKING

  const handleBooking =
  async () => {

    try {

      setLoading(true);

      // VALIDATION

      if (!startTime) {

        alert(
          "Please select start time"
        );

        return;
      }

      // PAYLOAD

      const bookingData = {

        shopId:
        service.shopId,

        serviceId:
        service._id,

        startTime

      };

      // API CALL

      const response = await createBooking(bookingData);
      console.log(response)

      // SUCCESS
      navigate("/customer/home")

      alert(response.message);

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Booking Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  // LOADING SAFETY

  if (!service) {

    return (

      <div className="p-10">

        <h1 className="text-2xl">
          Loading...
        </h1>

      </div>

    );

  }

  return (

    <div className="p-10">

      {/* SERVICE INFO */}

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
            mb-4
          "
        >
          {service.name}
        </h1>

        <p className="mb-2">

          Shop:
          {" "}

          {service.shopId?.name || service.shop?.name || "Unknown shop"}

        </p>

        <p className="mb-2">

          Price:
          {" "}

          ₹{service.price}

        </p>

        <p>

          Duration:
          {" "}

          {service.duration} mins

        </p>

      </div>

      {/* FORM */}

      <BookingForm

        startTime={startTime}

        setStartTime={setStartTime}

        handleBooking={handleBooking}

        loading={loading}

      />

    </div>

  );

};

export default BookingPage;