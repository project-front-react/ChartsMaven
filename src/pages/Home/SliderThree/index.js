import React from 'react'
import './SliderThree.scss';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Title from '../../../components/Title';
import { AppComponent } from '../../../appData/appComponent';
import { AppData } from '../../../appData/appData';
import { AppImages } from '../../../appData/appImages';
import { BASE_URL } from '../../../utils/Constants';

export default function SliderThree({ testimonialData }) {
    const CustomRightButton = ({ onClick }) => (
        <AppComponent.ButtonBlue direction="right" onClick={onClick} />
    );

    const CustomLeftButton = ({ onClick }) => (
        <AppComponent.ButtonBlue direction="left" onClick={onClick} />
    );
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
            items: 1
        }
    };
    return (
        <div className='testimonial-slider'>
            <Carousel responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={false}
                ssr={true}
                infinite={true}
                arrows={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customRightArrow={<CustomRightButton />}
                customLeftArrow={<CustomLeftButton />}
            >
                {testimonialData?.testimonials?.length > 0 && testimonialData?.testimonials?.map((item, index) => (
                    <div className='sliderBox' key={index}>
                        <div className='sliderWrapper'>
                            <img src={AppImages.quote} className='quotes-icon' alt='quotes' id="imgPre"/>
                            <div className='sliderContent'>
                                <h3 className='sliderTitle' dangerouslySetInnerHTML={{ __html: item.title }}>
                                </h3>
                                <div className='sliderDescription' dangerouslySetInnerHTML={{ __html: item.description }}>
                                </div>
                                <div className='authorDetails'>
                                    <div>
                                        <h5 className='name'>{item.full_name}</h5>
                                        <p className='designation'>{item.designation
                                        }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='imgContainer'>
                            <div className='profile-wrapper-slider'>
                                <img src={BASE_URL + item.profile_photo} alt='person' id="imgPre"/>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
