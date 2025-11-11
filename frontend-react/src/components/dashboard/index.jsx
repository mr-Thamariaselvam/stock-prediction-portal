import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Bl from "../../../businesslogic";
import { AlertNotify } from "../alertnotify";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [plots, setPlots] = useState({
    base_plot: "",
    ma100_plot: "",
    ma200_plot: "",
    prediction: "",
  });

  const [modelScroes, setModelScores] = useState({
    mse: "",
    rmse: "",
    r2: "",
  });

  useEffect(() => {
    Bl.Dashboard.getDashboardData()
      .then(() => {})
      .catch((error) => {
        AlertNotify.error(
          error?.detail ?? "Unable to fetch data, please try again"
        );
      });
  }, []);

  const onClickSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Bl.Dashboard.getPredictedStock({ ticker })
      .then((data) => {
        const baseURL = Bl.Auth.getBaseURL();

        // Assuming backend returns file paths for all 3 plots
        setPlots({
          base_plot: `${baseURL}${data?.plot_img ?? ""}`,
          ma100_plot: `${baseURL}${data?.plot_100_dma ?? ""}`,
          ma200_plot: `${baseURL}${data?.plot_200_dma ?? ""}`,
          prediction: `${baseURL}${data?.plot_prediction ?? ""}`,
        });

        setModelScores({
          mse: data?.mse ?? "",
          rmse: data?.rmse ?? "",
          r2: data?.r2 ?? "",
        });

        AlertNotify.success("Stock prediction fetched successfully!");
      })
      .catch((error) => {
        AlertNotify.error(
          error?.message ?? "Prediction failed, please try again"
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container text-light py-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={onClickSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Stock Ticker"
              required
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
            {loading ? (
              <button type="submit" className="btn btn-info mt-3" disabled>
                <FontAwesomeIcon icon={faSpinner} spin /> Please wait...
              </button>
            ) : (
              <button type="submit" className="btn btn-info mt-3">
                See Prediction
              </button>
            )}
          </form>
        </div>

        {/* Display All Prediction Plots */}
        {plots.prediction && (
          <div className="col-12 mt-5 text-center">
            {plots.base_plot && (
              <div className="mb-4">
                <h5>Base Prediction Plot</h5>
                <img
                  src={plots.base_plot}
                  alt="Base Prediction Plot"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {plots.ma100_plot && (
              <div className="mb-4">
                <h5>100 Days Moving Average</h5>
                <img
                  src={plots.ma100_plot}
                  alt="MA100 Plot"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {plots.ma200_plot && (
              <div className="mb-4">
                <h5>200 Days Moving Average</h5>
                <img
                  src={plots.ma200_plot}
                  alt="MA200 Plot"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {plots.prediction && (
              <div className="mb-4">
                <h5>Final Prediction Plot</h5>
                <img
                  src={plots.prediction}
                  alt="Prediction Plot"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <div className="text-light p-3">
              <h4>Model Evalution</h4>
              <p>Mean Sequre Error (MSE): {modelScroes?.mse}</p>
              <p>Root Mean Sequre Error (RMSE): {modelScroes?.rmse}</p>
              <p>R-Squared: {modelScroes?.r2}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
