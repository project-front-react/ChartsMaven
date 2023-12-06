import React from "react";
import "./AboutData.scss";
import { Link } from "react-router-dom";
import { AppImages } from "../../../appData/appImages";
export default function AboutData({ aboutUsData }) {

  return (
    <div className="about-details">
      <div className="total-years-section">
        <div className="years-number" data-years={aboutUsData?.no_of_years}>
          <img src={AppImages.YearsBg} alt="count" id="imgPre"/>
        </div>
        <div className="years-content">
          <h5>{aboutUsData?.title}</h5>
          <p>Unlock the power of Data visualization</p>
        </div>
      </div>
      <div className="about-content">
        <div className="description">
          <p dangerouslySetInnerHTML={{ __html: aboutUsData?.description }}></p>
        </div>
        <Link to={aboutUsData?.link} className="btn-link">
          {aboutUsData?.link_text}
        </Link>
      </div>
    </div>
  );
}
