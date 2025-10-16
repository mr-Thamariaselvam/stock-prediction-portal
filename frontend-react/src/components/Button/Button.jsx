import React from "react";
import { Link } from "react-router-dom";
const Button = (props) => {
  const { btnClass, btnName, url } = props;
  return (
    <>
      <Link to={url} className={`btn ${btnClass}`}>
        {btnName}
      </Link>
    </>
  );
};

export default Button;
