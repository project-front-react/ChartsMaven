import React, { useEffect } from "react";
import "../pageStyles.scss";
import { AppComponent } from "../../appData/appComponent";
import ZLayout from "./ZLayout";
import TeamLayout from "./TeamLayout";
import { getAboutUsDetail } from "../../redux/Slices/AboutUsSlice/aboutUsSlice";
import { useDispatch, useSelector } from "react-redux";
const AboutUS = ({ pageTitle }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAboutUsDetail());
  }, []);
  const aboutUsData = useSelector((state) => state.aboutUsDetails.aboutUsData);
  return (
    <AppComponent.MainLayout
      header
      pageTitle={aboutUsData?.data?.banner_section?.banner_title}
      pagebanner={aboutUsData?.data?.banner_section?.banner_image}
    >
      <div className="about-section">
        <div className="zLayout-wrapper">
          {/* <h2 dangerouslySetInnerHTML={{ __html: aboutUsData?.data?.content_section_1?.description}}></h2> */}
          {Object.values(aboutUsData).length > 0 &&
            Object.values(aboutUsData).map((val, i) => {
              return (
                <>
                {val.content_section_1?.section_1_is_active === true && 
                  <ZLayout data={val.content_section_1} />
                }
                {val.content_section_2?.section_2_is_active === true && 
                  <ZLayout data={val.content_section_2} />
                }
                {val.content_section_3?.section_3_is_active === true &&
                  <ZLayout data={val.content_section_3} adviceData={val?.content_section_3?.sub_description_1} professionalAdvice={val?.content_section_3?.sub_description_2} />
                }
                {val.content_section_4?.section_4_is_active === true &&
                  <TeamLayout data={val.content_section_4} />
                }
                </>
              );
            })}
        </div>
      </div>
    </AppComponent.MainLayout>
  );
};
export default AboutUS;
