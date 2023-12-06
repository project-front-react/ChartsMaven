import React, { useEffect, useState } from 'react'
import './Slidertwo.scss';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMedia } from '../../../utils/CustomHooks/useMedia';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../utils/Constants';




export default function SliderTwo({ analysisData }) {
  const [noOfDataInSingleSlide, setNoOfDataInSingleSlide] = useState(6);
  const [noOfSlide, setNoOfSlide] = useState([]);
  const navigate = useNavigate();
  const isTab = useMedia(["(max-width:991px) and (min-width:577px)"], [true], false);
  const isMobile = useMedia(["(max-width:576px)"], [true], false);
  const subCategoryLists = useSelector(
    (state) => state?.categoryListData?.categoryList?.data?.sub_categories
  );
  useEffect(() => {
    if (isTab) {
      setNoOfDataInSingleSlide(4);
    } else if (isMobile) {
      setNoOfDataInSingleSlide(1);
    } else {
      setNoOfDataInSingleSlide(6);
    }

  }, [isTab, isMobile])

  useEffect(() => {
    let slides = [];
    let sliderCount = Math.ceil(analysisData?.length / noOfDataInSingleSlide)

    for (let i = 0; i < sliderCount; i++) {
      slides.push(i * noOfDataInSingleSlide)
    }

    setNoOfSlide(slides);
  }, [analysisData, noOfDataInSingleSlide])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },

      items: 1,
    }
  };

  const handleNavigate = (id, categoryName) => {
    if (!id) {
      return;
    }
    // dispatch(getCategoryWiseArticle(id));
    navigate(`/categorywiselisting/${id}`, {
      state: {
        subCategoryLists: subCategoryLists,
        subcategoryname: categoryName,
      },
    });
  };
  return (
    <Carousel responsive={responsive}
      showDots={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      containerClass="marketCarousel-container"
    >
      {noOfSlide?.length > 0 &&
        noOfSlide?.map((val, i) => {
          return (
            <div className='dataSet' key={i} >
              <div className='gridSlider'>
                {analysisData?.filter((fil, index) => (index >= val && index < val + noOfDataInSingleSlide))?.map((item, index) => {
                  return (
                    <div className="horizontal-card" key={index}>
                      <div className='icon-wrapper'>
                        {item?.sub_category_image && (
                          <img src={`${BASE_URL}${item?.sub_category_image}`} alt='card-img' id="imgPre"/>
                        )}
                      </div>
                      <h3 dangerouslySetInnerHTML={{
                        __html: item?.sub_category_name
                      }} onClick={() =>
                        handleNavigate(
                          item.uuid,
                          item?.sub_category_name
                        )
                      }></h3>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })
      }
    </Carousel>
  )
}
