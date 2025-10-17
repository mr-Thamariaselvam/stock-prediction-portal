import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Bl from "../../../businesslogic";
import { AlertNotify } from "../alertnotify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeFields = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for the field being edited
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const onClickRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = new Bl.User({
      username: formData.username,
      password: formData.password,
      email: formData.email,
    });

    user
      .createUser()
      .then(() => {
        AlertNotify.success("Registered Successfully");
        setErrors({ username: "", email: "", password: "" });
        setFormData({ username: "", email: "", password: "" });
      })
      .catch((error) => {
        setErrors({
          username: error?.username ?? "",
          email: error?.email ?? "",
          password: error?.password ?? "",
        });
        AlertNotify.error("Unable to register, please try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 p-5 bg-light-dark rounded">
          <h3 className="text-light text-center mb-4">Create An Account</h3>
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
              {errors.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-control"
                placeholder="Enter Email Address"
                onChange={onChangeFields}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
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
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
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
                onClick={onClickRegister}
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
