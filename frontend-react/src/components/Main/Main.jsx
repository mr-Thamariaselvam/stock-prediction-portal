import React from "react";
import Button from "../Button/Button";

function Main() {
  return (
    <>
      <div className="container d-flex align-items-center">
        <div className="p-5 container text-center  bg-light-dark rounded">
          <h1 className="text-light">Stock Prediction Portal</h1>
          <p className="lead text-light">
            This stock prediction application utilizes machine learning
            techniques, specifically employing Keras, and LSTM model, integrated
            within the Django framework. It forecasts future stock prices by
            analyzing 100-day and 200-day moving averages, essential indicators
            widely used by stock analysts to inform trading and investment
            decisions.
          </p>
          <Button
            btnName={"Login"}
            btnClass={"btn-outline-info w-20"}
            url={"/login"}
          />
        </div>
      </div>
    </>
  );
}

export default Main;
