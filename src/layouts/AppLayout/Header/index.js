import React from "react";
import "./header.scss";
import CusContainer from "../../../components/Controls/Container";
import { useNavigate } from "react-router-dom";
import { AppImages } from "../../../appData/appImages";
const Header = (props) => {
  const { pageTitle,pageTag} = props;
  const navigate = useNavigate();
  return (
    <div
      className="heroBanner-section"
      style={{ backgroundImage: `url(${AppImages.HeroBg})` }}
    >
      <CusContainer>
        <div className="heroBanner-content">
          <h1>{pageTitle}</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumb-item" onClick={() => navigate("/")}>
              Home
            </li>
            {/* <li className="breadcrumb-data"></li> */}
            {pageTag && 
            <li className="breadcrumb-data">
              <span style={{margin:"0 5px"}}>{pageTag}</span></li>}
            <li className="breadcrumb-data"><span style={{margin:"0 5px"}}>{pageTitle}</span></li>
          </ul>
        </div>
      </CusContainer>
    </div>
  );
};

export default Header;
