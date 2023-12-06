import React from 'react'
import './AdContent.scss';
import { AppImages } from '../../../appData/appImages';

export default function AdContent({ adsLink }) {
    return (

        <div className='advt-box'>
            <div className='advtLeft'>
                <div className='advt-title'>
                    <h6 className='advt-download'>
                        Download the ChartsMaven App
                    </h6>
                </div>
                <div className='btnContainer'>
                    <div className='advt-btn-btn'>
                        <div className='imgContainer'>
                            <img src={AppImages.playstore} id="imgPre"/>
                        </div>
                        <a  target="_blank" href={adsLink?.play_store_link} >
                            <div className='btn-title'>
                                Get it on
                                <h6>Google Play</h6>
                            </div>
                        </a>
                    </div>
                    <div className='advt-btn-btnApple'>
                        <div className='imgContainer'>
                            <img src={AppImages.maclogo} id="imgPre"/>
                        </div>
                        <a  target="_blank" href={adsLink?.apple_store_link} >
                            <div className='btn-title'>
                                Download on
                                <h6>Apple store</h6>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='advtRight'>
                <img src={AppImages.mock_up} id="imgPre"/>
            </div>
        </div>

    )
}
