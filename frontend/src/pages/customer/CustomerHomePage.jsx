import { useNavigate } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import { useAuth } from "../../context/AuthContext";


const CustomerHomePage = () => {

  // HOOK
  // useNavigate is used for navigation between pages
const { user } = useAuth();
  const navigate = useNavigate();

  return (
  <AppLayout>
      <div className="p-10">

      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold mb-4">
        Welcome {user?.name}
      </h1>

      <p className="text-gray-600 mb-10">
        Browse salon services and manage your bookings
      </p>

      {/* BUTTON SECTION */}

      <div className="flex gap-6">

        {/* BROWSE SERVICES BUTTON */}

        <button
          onClick={() => navigate("/customer/services")}
          className="
            bg-black
            text-white
            px-8
            py-4
            rounded-lg
            hover:bg-gray-800
          "
        >
          Browse Services
        </button>

        {/* MY BOOKINGS BUTTON */}

        <button
          onClick={() => navigate("/customer/bookings")}
          className="
            bg-blue-600
            text-white
            px-8
            py-4
            rounded-lg
            hover:bg-blue-700
          "
        >
          My Bookings
        </button>

      </div>

    </div>
  </AppLayout>
    
  );
};

export default CustomerHomePage;