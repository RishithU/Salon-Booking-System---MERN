import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {

  const { token, user } = useAuth();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;