import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Slider.scss";
import ContainerData from "../../../components/commanLayout/Container/Container";
import { ButtonGroup } from "../../../components/commanLayout/Arrow/Index";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  

  const CustomRightButton = ({ onClick }) => (
    <ButtonGroup  direction="right" onClick={onClick} />
  );

  const CustomLeftButton = ({ onClick }) => (
    <ButtonGroup  direction="left" onClick={onClick} />
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
  const sliderdata = [
    {
      id: 1,
      title: "Get Daily Updates With Us",
      description:
        "ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates",
    },
    {
      id: 2,
      title: "Get Daily Updates With Us",
      description:
        "ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates",
    },
    {
      id: 3,
      title: "Get Daily Updates With Us",
      description:
        "ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={false}
        infinite={true}
        arrows={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customRightArrow={<CustomRightButton />}
        customLeftArrow={<CustomLeftButton />}
      >
        {sliderdata ? (
          sliderdata.map((item) => (
            <div className="Sliderimg">
              <ContainerData>
                <div className="sliderSection">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  {/* <div className="btn">
                    <button>Get Subscribe</button>
                  </div> */}
                </div>
              </ContainerData>
            </div>
          ))
        ) : (
          <h1>searching...</h1>
        )}
      </Carousel>
    </>
  );
}
