import React from "react";
import Button from "../Button/Button";

const Header = () => {
  return (
    <>
      <div className="container-fluid d-flex w-100  align-items-start p-3">
        <div className="container w-50">
          <nav className="container nav">
            <a href="" className="text-light nav-brand text-decoration-none">
              <h4>Stock Prediction Protal</h4>
            </a>
          </nav>
        </div>
        <div className="container w-50 d-flex justify-content-end gap-2">
          <Button btnName={"Login"} btnClass={"btn-outline-info w-20"} />
          <Button btnName={"Register"} btnClass={"btn-info w-20"} />
        </div>
      </div>
    </>
  );
};

export default Header;
