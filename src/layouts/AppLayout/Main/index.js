import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Header from '../Header';
import "./mainStyles.scss";
import Footer from '../Footer';
import { AppComponent } from '../../../appData/appComponent';
import { getFooterLinks } from '../../../redux/Slices/GetFooterLinks/GetFooterLinks';
import { useDispatch, useSelector } from 'react-redux';

const MainLayout = ({ children, header, heroSlider, pageTitle, data, pagebanner, categoryBannerImg,pageTag }) => {
    const dispatch = useDispatch();
    const [appHeader, setAppHeader] = useState(null)
    React.useEffect(() => {
        const header = document.querySelector(".app-header");
        if (header) {
            setAppHeader(header.getBoundingClientRect().height);
        }
    }, [appHeader]);
    const appMainStyle = {
        paddingTop: `${appHeader}px`
    }
    useEffect(() => {
        dispatch(getFooterLinks())
    }, [])
    const DynamicFooterLinks = useSelector((state) => state?.FooterLinksDynamic?.FooterData?.data)
    return (
        <React.Fragment>
            <Navbar headerLinksdata={DynamicFooterLinks?.header_section} />
            <div className={`page-wrapper`} style={appMainStyle}>
                {header && <Header pageTitle={pageTitle} pageTag={pageTag} />}
                {heroSlider && <AppComponent.Slider />}
                <AppComponent.CusContainer>
                    {children}
                </AppComponent.CusContainer>
            </div>
            <Footer footerLinksdata={DynamicFooterLinks?.footer_section} />
        </React.Fragment>
    )
}

export default MainLayout