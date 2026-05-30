import ServiceCard from "./ServiceCard";

const ServiceList = ({ serviceList }) => {
  console.log(serviceList)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {Array.isArray(serviceList) &&
        serviceList.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
          />
      ))}

    </div>
  );
};

export default ServiceList;