import React from "react";
import "./CustomButton.css";

const CustomButton = ({ children, variant, ...props }) => {
  const className =
    variant === "inverse" ? "custom-button-inverse" : "custom-button";

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
