import React from "react";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Bl from "../../../businesslogic";

const Header = () => {
  const { loggedIn, logout } = Bl.Auth.getUseAuth();
  const navigate = useNavigate();

  const onClickLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid d-flex w-100  align-items-start p-3">
        <div className="container w-50">
          <nav className="container nav">
            <Link to="/" className="text-light nav-brand text-decoration-none">
              <h4>Stock Prediction Protal</h4>
            </Link>
          </nav>
        </div>
        <>
          {loggedIn ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={onClickLogout}
            >
              Logout
            </button>
          ) : (
            <div className="container w-50 d-flex justify-content-end gap-2">
              <Button
                btnName={"Login"}
                btnClass={"btn-outline-info w-20"}
                url={"/login"}
              />
              <Button
                btnName={"Register"}
                btnClass={"btn-info w-20"}
                url={"/register"}
              />
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Header;
