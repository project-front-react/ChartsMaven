import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./heroSlider.scss";
import { AppComponent } from "../../../appData/appComponent";
import { AppData } from "../../../appData/appData";
import CusContainer from "../../../components/Controls/Container";
import Button from "../../../components/Controls/Button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/AppLayout/Main";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utils/Constants";
export default function HeroSlider() {
  const [containerPosition, setContainerPosition] = useState()
  useEffect(() => {
    let container = document.getElementById('container');
    setContainerPosition(container.getBoundingClientRect().left)
    console.log(container.getBoundingClientRect(), containerPosition, "SIZE")
  }, [])

  const HomePageContentData = useSelector(
    (state) => state?.homePageCMS?.homePageCMSData?.data?.banner_section
  );
  const CustomRightButton = ({ onClick }) => (
    <AppComponent.ButtonGroup position={containerPosition} direction="right" onClick={onClick} />
  );

  const CustomLeftButton = ({ onClick }) => (
    <AppComponent.ButtonGroup position={containerPosition} direction="left" onClick={onClick} />
  );
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleSubscriptionNavigate = () => {
    toast.error("Please Login to Buy a Subscription Plan");
  };
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      ssr={false}
      infinite={true}
      arrows={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customRightArrow={<CustomRightButton />}
      customLeftArrow={<CustomLeftButton />}
    >
      {HomePageContentData?.length > 0 &&
        HomePageContentData?.map((item, i) => (
          <div
            className="slider-image"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255, 0.1) 60%, rgba(20, 14, 14, 0.35) 100%),url(${BASE_URL}${item.banner})`,
            }}
            key={i}
          >
            <CusContainer style={{ padding: "12px" }}>
              <div className="slider-content">
                <div className="title-wrapper">
                  <h1
                    className="slider-title"
                    dangerouslySetInnerHTML={{ __html: item.banner_title }}
                  ></h1>
                </div>
                <p
                  className="slider-description"
                  dangerouslySetInnerHTML={{ __html: item.banner_description }}
                ></p>
                <div className="button-wrapper">
                  {/* <Button
                    text="Get Subscribe"
                    onClick={() => {
                      token
                        ? navigate("/get-subscription")
                        : handleSubscriptionNavigate();
                    }}
                  /> */}
                </div>
              </div>
            </CusContainer>
          </div>
        ))}
    </Carousel>
  );
}
