import React from "react";
import Bl from "../businesslogic";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { loggedIn } = Bl.Auth.getUseAuth();
  return loggedIn ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
