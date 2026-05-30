import { useNavigate }
from "react-router-dom";

const ServiceDetailCard = ({ service }) => {

  const navigate = useNavigate();

  return (

    <div
      className="
        bg-white
        shadow-lg
        rounded-lg
        p-8
        max-w-2xl
      "
    >

      {/* SERVICE NAME */}

      <h1
        className="
          text-4xl
          font-bold
          mb-6
        "
      >
        {service.name}
      </h1>

      {/* SHOP NAME */}

      <p className="text-lg mb-4">

        <span className="font-semibold">
          Shop:
        </span>

        

        {service.shopId.name}

      </p>

      {/* PRICE */}

      <p className="text-lg mb-4">

        <span className="font-semibold">
          Price:
        </span>

        {" "}

        ₹{service.price}

      </p>

      {/* DURATION */}

      <p className="text-lg mb-8">

        <span className="font-semibold">
          Duration:
        </span>

        {" "}

        {service.duration} mins

      </p>

      {/* DESCRIPTION */}

      <p className="text-lg mb-8">

        <span className="font-semibold">
          Description:
        </span>

        {" "}

        {service.description} 

      </p>

      {/* BOOK BUTTON */}

      <button

        onClick={() =>
          navigate(
            `/customer/book/${service._id}`
          )
        }

        className="
          bg-green-600
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-green-700
        "
      >
        Make Booking
      </button>

    </div>

  );

};

export default ServiceDetailCard;