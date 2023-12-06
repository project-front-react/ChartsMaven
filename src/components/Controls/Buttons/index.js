import React from "react";
import "../Button/Button.scss";
const CustomButton = ({ text, bg, textColor, shadow, onClick, border, cusClass,padding, margin }) => {
  const buttonStyles = {
    background: bg,
    color: textColor,
    boxShadow: shadow,
    border: border,
    padding: padding,
    margin:margin
  };
  return (
    <button
      onClick={onClick}
      className={`cus-button ${cusClass}`}
      style={buttonStyles}
    >
      {text}
    </button>
  );
};

export default CustomButton;
