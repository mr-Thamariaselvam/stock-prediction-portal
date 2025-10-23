import React, { useEffect } from "react";
import Bl from "../../../businesslogic";
import { AlertNotify } from "../alertnotify";

const Dashboard = () => {
  useEffect(() => {
    Bl.Dashboard.getDashboardData()
      .then((data) => {})
      .catch((error) => {
        AlertNotify.error(
          error?.detail ?? "Unable to fetchdata, please try again"
        );
      });
  }, []);
  return <div className="container text-light">Dashboard</div>;
};

export default Dashboard;
