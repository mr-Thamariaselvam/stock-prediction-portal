import React from "react";
import { Navigate } from "react-router-dom";

import Bl from "../businesslogic";

const PublicRoute = ({ children }) => {
  const { loggedIn } = Bl.Auth.getUseAuth();

  return !loggedIn ? children : <Navigate to={"/dashboard"} />;
};

export default PublicRoute;
