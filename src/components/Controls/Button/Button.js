import React from "react";
import "./Button.scss";

export default function Button(props) {
  const { text, type, onClick} = props;
  return (
    <button className="btnData" type={type} onClick={onClick} >
      {text}
    </button>
  );
}
