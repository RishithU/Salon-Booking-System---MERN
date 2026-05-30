const ServiceCard = ({ service }) => {
    console.log(service)
  return (
    <div className="border rounded-xl p-4 shadow-sm">

      <h2 className="text-xl font-semibold mb-2">
        {service.name}
      </h2>

      <p className="text-gray-600 mb-2">
        {service.description}
      </p>

      <div className="flex justify-between">

        <span className="font-medium">
          ₹ {service.price}
        </span>

        <span>
          {service.duration} mins
        </span>

      </div>

    </div>
  );
};

export default ServiceCard;