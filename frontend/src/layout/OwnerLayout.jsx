import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-black text-white p-4 text-2xl font-bold">
        Owner Dashboard
      </div>

      {/* Page Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerLayout;