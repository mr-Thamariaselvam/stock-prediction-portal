import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Bl from "../../../businesslogic";
import { AlertNotify } from "../alertnotify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAuthenticatedUser } = Bl.Auth.getUseAuth();

  const onChangeFields = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    Bl.User.loginUser({
      username: formData?.username,
      password: formData.password,
    })
      .then((user) => {
        setAuthenticatedUser(user);
        AlertNotify.success("Logged In Successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        AlertNotify.error(error?.detail ?? "Unable to login, please try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 p-5 bg-light-dark rounded">
            <h3 className="text-light text-center mb-4">Login To Our Portal</h3>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={onChangeFields}
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  className="form-control"
                  placeholder="Set Password"
                  onChange={onChangeFields}
                />
              </div>
              {loading ? (
                <button
                  type="button"
                  className="btn btn-info d-block mx-auto"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Please wait...
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-info d-block mx-auto"
                  onClick={onClickLogin}
                >
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
