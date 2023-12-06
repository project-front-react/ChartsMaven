import React, { useEffect } from 'react'
import "./categoryListing.scss";
import { AppComponent } from '../../appData/appComponent';
import CategoryBox from './CategoryBox';
import { AppImages } from '../../appData/appImages';
import "../pageStyles.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryList } from '../../redux/Slices/GetCategory/getCategorySlice';
import { useState } from 'react';
import { FaSortAmountDownAlt , FaSortAmountUpAlt } from 'react-icons/fa';

const CategoryListing = ({ pageTitle }) => {

    const dispatch = useDispatch();
    const [sort, setSort] = useState(false);
    const [iconChange, setIconChange] = useState(false)
    const [active, setActive] = useState("dsc")

    useEffect(() => {
        dispatch(getCategoryList({ sort: "dsc" }));
    }, []);

    const subCategoryLists = useSelector((state) => state?.categoryListData?.categoryList)
    const HandleSort = (sortname) => {
        setActive(sortname)
        if (sortname === "asc") {
            setIconChange(true)
        } else if (sortname === "dsc") {
            setIconChange(false)
        }
        setSort(false);
        dispatch(
            getCategoryList({
                sort: sortname,
            })
        );
    };
    const handleOutsideClick = () => {
        sort && setSort(false);
    };
    return (
        <AppComponent.MainLayout header pageTitle={pageTitle} categoryBannerImg={subCategoryLists?.data?.banner_section?.banner_image}>
            <div className='categories'
                onClick={handleOutsideClick}
            >
                <div className='filter-options'>
                    <span className="sorting" onClick={() => setSort(!sort)}>
                    {iconChange === true ? <FaSortAmountUpAlt className="faIcon"/>: <FaSortAmountDownAlt className="faIcon"/>}
                    </span>
                    {sort && (
                        <div className="sorting_content" onClick={() => setSort(!sort)}>
                            <p onClick={() => HandleSort("dsc")} className={`${active == "dsc" ? "active" : ""}`}>Newest To Oldest</p>
                            <p onClick={() => HandleSort("asc")} className={`${active !== "dsc" && active != "" ? "active" : ""}`}>Oldest To Newest</p>
                        </div>
                    )}
                    {/* <span className='filtering'><img src={AppImages.FilterIcon} alt="filtering" /></span> */}
                </div>
                <div className='category-listing'>
                    {subCategoryLists?.data?.sub_categories?.length > 0 && subCategoryLists?.data?.sub_categories?.map((val, i) => (
                        <React.Fragment key={i}>
                            <CategoryBox subCategoryData={val} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </AppComponent.MainLayout>
    )
}

export default CategoryListing