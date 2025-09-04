import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/adminlogin" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
