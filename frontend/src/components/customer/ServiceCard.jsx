import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {

  const navigate = useNavigate();

  return (

    <div
      className="
        bg-white
        shadow
        rounded-lg
        p-6
        border
      "
    >

      {/* SERVICE NAME */}

      <h2 className="text-2xl font-semibold mb-2">
        {service.name}
      </h2>

      {/* SHOP NAME */}

      <p className="text-gray-700 mb-2">

        Shop:
    
        {service.shopId.name}

      </p>

      {/* PRICE */}

      <p className="text-gray-700 mb-4">

        Price:
        {" "}

        ₹{service.price}

      </p>

      {/* BUTTON */}

      <button

        onClick={() =>
          navigate(
            `/customer/service/${service._id}`
          )
        }

        className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded
        "
      >
        View Details
      </button>

    </div>

  );

};

export default ServiceCard;