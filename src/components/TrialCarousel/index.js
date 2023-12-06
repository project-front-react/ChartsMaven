import React from 'react';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import './CustomCarousel.css';
import "./trial.scss"

const sliderdata = [
    {
        id: 1,
        title: 'Get Daily Updates With Us',
        description: 'ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates'
    },
    {
        id: 2,
        title: 'Get Daily Updates With Us',
        description: 'ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates'
    },
    {
        id: 3,
        title: 'Get Daily Updates With Us',
        description: 'ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates'
    },
    {
        id: 2,
        title: 'Get Daily Updates With Us',
        description: 'ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates'
    },
    {
        id: 3,
        title: 'Get Daily Updates With Us',
        description: 'ChartsMaven Helps you to start your trading with tips, articles, how to start trading and provide you to day to day live updates'
    }
]


const CustomCarousel = ({ items }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 3, 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      
      carouselState: { currentSlide, deviceType },
    } = rest;
    return (
        <button
        className={`custom-arrow right-arrow ${
          currentSlide === items?.length - 1 ? 'disabled' : ''
        }`}
        onClick={() => {
          onClick();
        //   onMove(1);
        }}
        disabled={currentSlide === items?.length - 1}
      />
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    return (
        <button
        className={`custom-arrow left-arrow ${
          currentSlide === 0 ? 'disablede' : ''
        }`}
        onClick={() => {
          onClick();
        //   onMove(-1);
        }}
        disabled={currentSlide === 0}
      />
    );
  };

  return (
    <MultiCarousel
      responsive={responsive}
      arrows={true}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {sliderdata?.map((item) => (
        <div key={item.id}>{item.description}</div>
      ))}
    </MultiCarousel>
  );
};

export default CustomCarousel;
