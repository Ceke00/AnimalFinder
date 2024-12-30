import React from "react";
import { Navigate } from "react-router-dom";

//Children will be rendered if there is a user information with user name saved in local storage (authenticated user). If not user will be redirected to login
const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const isAuthenticated = storedUser && JSON.parse(storedUser).username;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
