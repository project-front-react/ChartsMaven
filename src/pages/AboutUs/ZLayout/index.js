import React from "react";
import Title from "../../../components/Title";
import "./zLayout.scss";
import { AppComponent } from "../../../appData/appComponent";
import SupportTool from "../SupportTool";
import { BASE_URL } from "../../../utils/Constants";
const ZLayout = (props) => {
  const { data, adviceData,professionalAdvice } = props;
  return (
    <>
      {data !== undefined && (
        <div className={`zLayout-content`}>
          <div className="content-left">
            <Title abouttitle={data?.heading} underline />
            <div
              className="content-description"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
            <SupportTool extraData={adviceData} dataproffesional={professionalAdvice} />
          </div>
          <div className="content-right">
            <AppComponent.ImageContainer
              src={`${BASE_URL}${data?.image}`}
              alt="about-image-section"
              size="md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ZLayout;
