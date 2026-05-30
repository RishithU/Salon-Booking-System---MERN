import ServiceCard from "./ServiceCard";

const ServiceCardList = ({ services }) => {
    
  return (

    <div className="grid grid-cols-1 gap-6">

      {

        services.map((service) => (

          <ServiceCard

            key={service._id}

            service={service}

          />

        ))

      }

    </div>

  );

};

export default ServiceCardList;