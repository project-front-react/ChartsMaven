import React from 'react'
import "./authlayout.scss"
import { AppImages } from '../../appData/appImages';
import { Link } from 'react-router-dom';

const AuthLaout = ({ children, passLink }) => {
  return (
    <div className="AuthMainLayout">
      <div className='AuthWrapp'>
        <div className='AuthImage'>
          <div className="ImageSection">
            <img src={AppImages.signup} alt='brand-logo' id="imgPre"/>
          </div>
        </div>
        <div className="AuthDetalis">
          <Link to={passLink == 'otpmobile' || passLink == 'otpgmail' ? "" : "/"} className="LogoWrap">
            <img src={AppImages.logo} alt='logo' id="imgPre"/>
          </Link>
          <div className="AuthSection">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLaout;