import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import LogoutButton from "./LogoutButton"

const TopBar = () => {

  const navigate = useNavigate();

  

  return (

    <div className="bg-black text-white px-8 py-4 flex justify-between items-center">

      {/* App Name */}

      <h1 className="text-2xl font-bold">
        Salon Booking
      </h1>

      {/* Action Buttons */}

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/profile")}
          className="bg-white text-black px-4 py-2 rounded-lg"
        >
          Profile
        </button>

        <LogoutButton/>

      </div>

    </div>
  );
};

export default TopBar;