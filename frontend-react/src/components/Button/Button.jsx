import React from "react";

const Button = (props) => {
  const { btnClass, btnName } = props;
  return (
    <>
      <a href="#" className={`btn ${btnClass}`}>
        {btnName}
      </a>
    </>
  );
};

export default Button;
