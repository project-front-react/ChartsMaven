import React, { useEffect } from 'react'
import { AppComponent } from '../../appData/appComponent'
import "../pageStyles.scss";
import Title from '../../components/Title'
import { useDispatch, useSelector } from 'react-redux';
import { getPrivacyPolicies } from '../../redux/Slices/PrivacyPolicySlice/PrivacyPolicySlice';

const PrivacyPolicy = ({ pageTitle }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrivacyPolicies());
    }, [])
    const PrivacyPolicyData = useSelector((state) => state.PrivacyData.PoliciesData)
    return (
        <AppComponent.MainLayout header pageTitle={PrivacyPolicyData?.data?.content_section_1?.heading}>
            <div className='privacy-page inner-page'>
                <Title title={PrivacyPolicyData?.data?.content_section_1?.heading} underline />
                <div className='page-content' dangerouslySetInnerHTML={{ __html: PrivacyPolicyData?.data?.content_section_1?.description }}></div>
            </div>
        </AppComponent.MainLayout>
    )
}

export default PrivacyPolicy