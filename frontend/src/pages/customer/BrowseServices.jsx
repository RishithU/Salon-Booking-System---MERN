import { useState } from "react";

import { searchServices } from "../../api/Services";

import ServiceCardList
from "../../components/customer/ServiceList";

const BrowseServices = () => {

  // SEARCH INPUT STATE

  const [searchText, setSearchText]
  = useState("");

  // SERVICES STATE

  const [services, setServices]
  = useState([]);

  // LOADING STATE

  const [loading, setLoading]
  = useState(false);

  // SEARCH FUNCTION

  const handleSearch = async () => {

    try {

      setLoading(true);

      // API CALL

      const data =
      await searchServices(searchText);

      // STORE DATA

      setServices(data);

    }

    catch (error) {

      console.log(error);

      alert("Failed to fetch services");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-10">

      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold mb-8">

        Browse Services

      </h1>

      {/* SEARCH SECTION */}

      <div className="flex gap-4 mb-10">

        <input

          type="text"

          placeholder="Enter service name"

          value={searchText}

          onChange={(e) =>
            setSearchText(e.target.value)
          }

          className="
            border
            border-gray-400
            px-4
            py-3
            rounded
            w-96
          "
        />

        <button

          onClick={handleSearch}

          className="
            bg-black
            text-white
            px-6
            py-3
            rounded
          "
        >
          Search
        </button>

      </div>

      {/* LOADING */}

      {

        loading && (

          <p className="text-lg">
            Loading...
          </p>

        )

      }

      {/* SERVICE LIST */}

      <ServiceCardList services={services} />

    </div>

  );

};

export default BrowseServices;