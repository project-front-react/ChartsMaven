import React, { useEffect } from "react";
import { AppComponent } from "../../appData/appComponent";
import Title from "../../components/Title";
import { getHomePageContent } from "../../services/apiServices/getHomePageContent";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "../pageStyles.scss";
import { getCMSPageDataAPICall } from "../../redux/Slices/cmsSlice";
import { getUserDetail } from "../../redux/Slices/getUserDetail/getUserDetail";
import { getFooterLinks } from "../../redux/Slices/GetFooterLinks/GetFooterLinks";
import { updatedNewUpdateList } from "../../redux/Slices/NewUpdates/newUpdatesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const HomePageContentData = useSelector(
    (state) => state.homePageCMS.homePageCMSData
  );
  useEffect(() => {
    getHomePageContent()
      .then((item) => {
        dispatch(getCMSPageDataAPICall(item));
      })
      .catch((err) => {
      });
  }, []);

  useEffect(() => {
    dispatch(getFooterLinks())
  }, [])
  //footer links
  // const DynamicFooterLinks = useSelector((state) => state.FooterLinksDynamic.FooterData)
  //Dynamic section starts

  //Update section start
  const UpdatesSection = HomePageContentData?.data?.content_section_1;
  //update section end

  //Analysis Section start
  const AnalysisSection = HomePageContentData?.data?.content_section_2;
  //Analysis Section end

  //Analysis Section start
  const AboutUsSection = HomePageContentData?.data?.content_section_3;
  //Analysis Section end

  //Testimonial section start
  const TestimonialSection = HomePageContentData?.data?.content_section_4;
  //Testimonial section end

  //Adds section start
  const DownloadSection = HomePageContentData?.data?.content_section_5;
  //Adds section end

  // api call for getting profile user details
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserDetail()).then((res) => {
        localStorage.setItem(
          "profiledetails",
          JSON.stringify(res?.payload?.data?.data?.user)
        );
      });
    } else {
      localStorage.removeItem("profiledetails");
    }
  }, []);
  return (
    <AppComponent.MainLayout heroSlider data={HomePageContentData?.data}>
      <section className="current-updated">
        {
          UpdatesSection?.section_1_is_active === true &&
          <>
            <Title title={UpdatesSection?.heading} underline />
            <AppComponent.Cards latestUpdates={UpdatesSection?.available_updates} />
          </>
        }
        {
          AnalysisSection?.section_2_is_active === true &&
          <div className="market-analysis">
            <Title
              title={AnalysisSection?.heading}
              subTitle={AnalysisSection?.sub_title}
            />

            <AppComponent.SliderTwo
              analysisData={AnalysisSection?.sub_categories}
            />
          </div>
        }
      </section>
      {AboutUsSection?.section_3_is_active === true &&
        <section className="about-us">
          <Title title={AboutUsSection?.heading} underline />
          <AppComponent.AboutData aboutUsData={AboutUsSection} />
        </section>
      }
      {TestimonialSection?.section_4_is_active === true &&
        <section className="testimonial-section">
          <Title title={TestimonialSection?.heading} underline />
          <AppComponent.SliderThree testimonialData={TestimonialSection} />
        </section>
      }
      {DownloadSection?.section_5_is_active === true &&
        <section className="advt-section">
          <Title title={DownloadSection?.heading} underline />
          <AppComponent.AdContent adsLink={DownloadSection} />
        </section>
      }
    </AppComponent.MainLayout>
  );
};

export default Home;
