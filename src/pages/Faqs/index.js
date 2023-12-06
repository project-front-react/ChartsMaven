import React, { useEffect } from 'react'
import { AppComponent } from '../../appData/appComponent'
import "../pageStyles.scss";
import Title from '../../components/Title'
import Accordion from '../../components/Accordion';
import FaqsData from "../../appData/faq.json"
import { useState } from 'react';
import { getFAQDetail } from '../../redux/Slices/FAQSlice/FAQSlice';
import { useDispatch, useSelector } from 'react-redux';
const Faqs = (props) => {
    const { pageTitle } = props
    const dispatch = useDispatch()
    const [active, setActive] = useState(null);

    const handleToggle = (index) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    };
    useEffect(() => {
        dispatch(getFAQDetail());
    }, []);
    const FAQListing = useSelector((state) => state.FAQListing.FAQData)
    return (
        <AppComponent.MainLayout header pageTitle={pageTitle}>
            <div className='faqs-page inner-page'>
                <Title title="Frequently Asked Questions " underline />
                <div className='faqs-page-description'>
                Lorem ipsum Tempor incididunt ut labore et dolore magna aliquat enim veniam quis nostrud exercitation ullamco laboris nis aliquip consequat duis aute irure dolor voluptate. 
                </div>
                <div className='faq-section'>
                    {FAQListing?.data?.length > 0 && FAQListing?.data?.map((val, i) => (
                        <Accordion key={i}
                            active={active}
                            handleToggle={handleToggle}
                            faq={val} />
                    ))}
                </div>
            </div>
        </AppComponent.MainLayout>
    )
}

export default Faqs