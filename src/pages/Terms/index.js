import React, { useEffect } from 'react'
import { AppComponent } from '../../appData/appComponent'
import "../pageStyles.scss";
import Title from '../../components/Title'
import TermsData from "../../appData/privacy.json"
import { scrollToTop } from '../../components/ScrollToTop/ScrollToTop';
const Terms = (props) => {
    const { pageTitle } = props
    useEffect(() => {
        scrollToTop()
    }, [])
    return (
        <AppComponent.MainLayout header pageTitle={pageTitle}>
            <div className='terms-page inner-page'>
                <Title title="Terms & Conditions" underline />

                <div className='page-content' dangerouslySetInnerHTML={{ __html: TermsData.data[0].content }}></div>
            </div>
        </AppComponent.MainLayout>
    )
}

export default Terms