import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const LogoutButton = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {

    try {

      await API.post("/auth/logout");

      logout();

      alert("Logout Successful");

      window.location.href = "/login";

    } catch (error) {

      console.log(error);

      alert("Logout Failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
};

export default LogoutButton;