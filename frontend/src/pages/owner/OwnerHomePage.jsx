import { useNavigate } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import { useAuth } from "../../context/AuthContext";


const OwnerHomePage = () => {

  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <AppLayout>
        <div className=" bg-gray-100 p-10">

      {/* Welcome Section */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-2">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-600 text-lg">
          Signed in as Owner
        </p>

      </div>

      {/* Dashboard Buttons */}

      <div className="grid grid-cols-3 gap-4">

        <button
          onClick={() => navigate("/owner/add-shop")}
          className="bg-black text-white p-8 rounded-2xl text-2xl font-semibold hover:scale-105 transition"
        >
          Add Shop
        </button> 

        <button
          onClick={() => navigate("/owner/staff")}
          className="bg-black text-white p-8 rounded-2xl text-2xl font-semibold hover:scale-105 transition"
        >
          View Staff
        </button>       


        <button
          onClick={() => navigate("/owner/services")}
          className="bg-black text-white p-8 rounded-2xl text-2xl font-semibold hover:scale-105 transition"
        >
          View Services
        </button>

        <button
          onClick={() => navigate("/owner/bookings")}
          className="bg-black text-white p-8 rounded-2xl text-2xl font-semibold hover:scale-105 transition"
        >
          View Bookings
        </button>

        <button
          onClick={() => navigate("/owner/analytics")}
          className="bg-black text-white p-8 rounded-2xl text-2xl font-semibold hover:scale-105 transition"
        >
          View Analytics
        </button>

      </div>

    </div>
    </AppLayout>
    
  );
};

export default OwnerHomePage;