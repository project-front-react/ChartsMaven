import React from 'react'
import './NoArticle.scss';
import { AppImages } from '../../appData/appImages'

const NoArticle = (props) => {
  return (
    <>
        <div className='noArticleContainer'>
            <div className='imageWrapper'>
                <img src={AppImages.NoData} alt='no-data' id="imgPre"/>
            </div>
            <h2 className='noData'>
                {props.title}
            </h2>
        </div>
    </>
  )
}

export default NoArticle