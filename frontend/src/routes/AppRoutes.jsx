import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Logout from "../components/common/LogoutButton";
import Unauthorized from "../pages/Unauthorized"
import OwnerHomePage from "../pages/owner/OwnerHomePage";
import CustomerHomePage from "../pages/customer/CustomerHomePage";
import ProfilePage from "../pages/ProfilePage";

import OwnerLayout from "../layout/OwnerLayout";
import OwnerBookingsPage from "../pages/owner/Bookings";
import BookingDetailsPage from "../pages/owner/BookingsDetail";

import StaffPage from "../pages/owner/Staff";
import AddShop from "../pages/owner/AddShop";
import StaffDetailsPage from "../pages/owner/StaffDetail";
import AddStaff from "../pages/owner/AddStaff"

import Services from "../pages/owner/Services"
import AddService from "../pages/owner/AddService"
import CustomerInsights from "../pages/owner/CustomerInsights";
import Analytics from "../pages/owner/Analytics";

import BrowseServices from "../pages/customer/BrowseServices";
import ServiceDetail from "../pages/customer/ServiceDetail";

import BookingPage from "../pages/customer/BookingPage";
import MyBooking from "../pages/customer/MyBookings";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/logout"
          element={<Logout />}
        />

         <Route
            path="/owner/home"
            element={
                <ProtectedRoute allowedRoles={["owner"]}>
                <OwnerHomePage />
                </ProtectedRoute>
            }
        />       

        <Route
            path="/customer/home"
            element={
                <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerHomePage />
                </ProtectedRoute>
            }
        />

        
         <Route
            path="/owner/bookings"
            element={<OwnerBookingsPage />}
          />

        
          <Route
            path="/owner/bookings/:bookingId"
            element={<BookingDetailsPage />}
          />

          <Route
            path="/owner/staff"
            element={<StaffPage />}
          />
          
          <Route
            path="/owner/add-shop"
            element={<AddShop />}
          />

          <Route
            path="/owner/staff/:staffId"
            element={<StaffDetailsPage />}
          />

          <Route path="/owner/add-staff" element={<AddStaff />} />


          <Route
            path="/owner/services"
            element={<Services />}
          />

          <Route path="/owner/add-service" element={<AddService />} />
          
          <Route
            path="/owner/analytics"
            element={<Analytics />}
          />
          <Route
            path="/owner/customer-insights"
            element={<CustomerInsights />}
          />

        <Route
          path="/customer/services"
          element={<BrowseServices />}
        />

        <Route
          path="/customer/service/:serviceId"
          element={<ServiceDetail />}
        />

        <Route
          path="/customer/book/:serviceId"
          element={<BookingPage />}
        />

         <Route
          path="/customer/bookings"
          element={<MyBooking />}
        />


        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

       
         
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;