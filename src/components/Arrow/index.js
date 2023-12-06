import React from "react";
import './Arrow.scss';
import { AppImages } from "../../appData/appImages";
export const ButtonGroup = ({ onClick, direction }) => {
  // console.log(position,"position")
  const icon = direction === "left" ? "<" : ">";
  return (
    // <div>
    <button className={`custom-button custome-${direction}`} onClick={onClick}>
      <img src={AppImages.left} alt="slide-arrow" id="imgPre"/>
    </button>
    // {/* </div> */}
  );
};
export const ButtonBlue = ({ onClick, direction }) => {
  const icon = direction === "left" ? "<" : ">";
  return (
    <button className={`custom-buttonBlue custom-${direction}`} onClick={onClick}>
      <img src={AppImages.leftBlue} alt="slide-arrow" id="imgPre"/>
    </button>
  );
};