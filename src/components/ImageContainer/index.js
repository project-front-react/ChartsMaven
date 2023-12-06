import React from 'react'
import "./imageContainer.scss";
import { useState } from 'react';
import { AppImages } from '../../appData/appImages';
import ImageLoader from '../ImageLoader';

const ImageContainer = (props) => {
    // const [isLoading, setIsLoading] = useState(true);
    const { src, alt, size } = props
    const onImageError = (e) => {
        e.target.src = AppImages.PlaceHolderImage
    }
    // const handleImageLoad = () => {
    //     setIsLoading(false);
    // };
    return (
        <div className='image-container'>
            <div className={`image-wrapper image-${size}`}>
                {/* {isLoading && <ImageLoader />} */}
                <img src={src} alt={alt} onError={onImageError}  />
            </div>
        </div>
    )
}

export default ImageContainer