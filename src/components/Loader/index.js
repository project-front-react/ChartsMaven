import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loaderWrap">
      <div className="loaderDotSpin"></div>
      <h1 data-text="It's loading…"></h1>
    </div>
  );
};

export default Loader;
