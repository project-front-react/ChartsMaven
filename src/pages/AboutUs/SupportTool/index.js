import React from 'react'
// import './SupportTool.scss';
import './SupportTool.scss';
import { AppImages } from '../../../appData/appImages';

const SupportTool = ({ extraData,dataproffesional }) => {
  return (
    <>
      {extraData !== undefined && (
        <div className='SupportMainLayout'>
          <div className='supportLayout'>
            <div className='imgWrapper'>
              <img src={AppImages.greatSupport} alt='Great-Support' id="imgPre"/>
            </div>
            <h6>Gtreat Support</h6>
            <div className='contentData'
              dangerouslySetInnerHTML={{ __html: extraData }}
            >
            </div>
          </div>
          <div className='supportLayout'>
            <div className='imgWrapper'>
              <img src={AppImages.ProfesssionalAdvice} alt='Great-Support' id="imgPre"/>
            </div>
            <h6>Professional Advice</h6>
            <div className='contentData'
              dangerouslySetInnerHTML={{ __html: dataproffesional }}
            >
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SupportTool