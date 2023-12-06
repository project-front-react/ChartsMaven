import React, { useEffect } from "react";
import { AppComponent } from "../../../appData/appComponent";
import { AppImages } from "../../../appData/appImages";
import "../categoryListing.scss";
import Title from "../../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Controls/Buttons";
import SubCategoryBox from "../SubCategoryBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCategoryWiseArticle,
  getTagWiseCategoryArticle,
} from "../../../redux/Slices/getCategoryWiseList/getCategoryWiseList";
import { useState } from "react";
import NoArticle from "../../../components/NoArticle";
import { Col, Row } from "react-bootstrap";
import { scrollToTop } from "../../../components/ScrollToTop/ScrollToTop";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa';
import { BASE_URL } from "../../../utils/Constants";


// category wise article list apge
const SubCategoryListing = ({ pageTitle, horizontally, vertically }) => {
  const CatWiseArticleData = useSelector(
    (state) => state.categoryWiseArticleList.categoryWiseArticle
  );
  const dispatch = useDispatch(null);
  const UUID = useParams();
  const location = useLocation();
  const MoreCategoryData = location.state;

  const [selectedTab, setSelectedTab] = useState("");
  const [selectedTabnew, setSelectedTabNew] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [showFilters, setShowFilters] = useState(false);
  const [categoryUUID, setMoreCategoryUUID] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedCategory, setSelecteCategory] = useState("");
  const [iconChange, setIconChange] = useState(false)
  const [sort, setSort] = useState(false);
  const [active, setActive] = useState("asc")

  useEffect(() => {
    if (
      CatWiseArticleData &&
      Object.keys(CatWiseArticleData)?.length > 0 &&
      CatWiseArticleData.tags?.length > 0
    ) {
      setSelectedTab(CatWiseArticleData?.tags[0]?.article_tag);
    }
  }, [CatWiseArticleData]);

  useEffect(() => {
    dispatch(getCategoryWiseArticle(UUID.id));
  }, []);

  useEffect(() => {
    if (CatWiseArticleData?.data?.length > 0) {
      setSubCategory(CatWiseArticleData?.data);
    }
  }, [CatWiseArticleData?.data]);

  const handleCategory = (val) => {
    setSelectedTabNew("");
    setMoreCategoryUUID(val.uuid);
    setSelecteCategory(val?.sub_category_name);
    dispatch(getCategoryWiseArticle(val.uuid));
    scrollToTop(0, 300)
    // window.location.reload(true);
    // window.scrollTo(0, 0)
  };

  let selectUUID = categoryUUID ? categoryUUID : UUID.id;

  const handleTab = (e, index) => {
    setSelectedTab("");
    setSelectedTabNew(e.article_tag);
    let data = {
      id: selectUUID,
      tag: e.article_tag,
    };
    dispatch(getTagWiseCategoryArticle(data));

  };

  const sortNewestToOldest = () => {
    const subCategoryLists = subCategory?.subCategoryLists;
    if (subCategoryLists) {
      const sortedData = [...subCategoryLists].sort(
        (a, b) => new Date(b?.created_datetime) - new Date(a?.created_datetime)
      );
      setFilteredData(sortedData);
    }
    setActive("asc")
    setShowFilters(!showFilters)
    setIconChange(false)
  };

  // Sort data from oldest to newest
  const sortOldestToNewest = () => {
    const subCategoryLists = subCategory?.subCategoryLists;
    if (subCategoryLists) {
      const sortedData = [...subCategoryLists].sort(
        (a, b) => new Date(a?.created_datetime) - new Date(b?.created_datetime)
      );
      setFilteredData(sortedData);
    }
    setIconChange(true)
    setActive("dsc")
    setShowFilters(!showFilters)
  };
  const handleFilter = () => {
    setShowFilters(!showFilters);
  };
  return (
    <AppComponent.MainLayout header pageTitle={"Categories"}>
      <div className="categories sub-category">
        {/* <div className="filter-options text-end my-4">
          <span className="sorting" onClick={handleFilter}>
            {iconChange === true ? <FaSortAmountUpAlt className="faIcon"/>: <FaSortAmountDownAlt className="faIcon"/>}
          </span>
          {showFilters && (
            <div className="sorting_content" onClick={() => setSort(!sort)}>
              <p onClick={sortNewestToOldest} className={`${active == "asc" ? "active" : ""}`} >Newest To Oldest</p>
              <p onClick={sortOldestToNewest} className={`${active == "dsc" && active != "" ? "active" : ""}`}>Oldest To Newest</p>
            </div>
          )}
        </div> */}
        <Row>
          {/* <SidebarMain> */}
          <Col lg={8} md={8}>
            <div className="main-content">
              <Title
                title={
                  selectedCategory
                    ? selectedCategory
                    : MoreCategoryData?.subcategoryname
                }
                underline
              />
              <div className="button-group">
                {CatWiseArticleData &&
                  Object.keys(CatWiseArticleData)?.length > 0 &&
                  CatWiseArticleData.tags?.length > 0 &&
                  CatWiseArticleData.tags.map((item, index) => {
                    return (
                      <React.Fragment className="mt-2" key={index}>
                        <CustomButton
                          text={item?.article_tag}
                          bg={
                            (selectedTabnew ? selectedTabnew : selectedTab) ==
                              item.article_tag
                              ? "#009444"
                              : "transparent"
                          }
                          textColor={
                            (selectedTabnew ? selectedTabnew : selectedTab) ==
                              item.article_tag
                              ? "#ffffff"
                              : "#009444"
                          }
                          margin={'0.5rem 5px 0.5rem 0px'}
                          padding={'0.5rem 2rem'}
                          border={"2px solid #009444"}
                          onClick={(e) => handleTab(item)}
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
              {CatWiseArticleData?.data?.length > 0 ? (
                <div>
                  <div className="sub-category-listing ">
                    {subCategory?.length > 0 ? (
                      subCategory?.map((val, i) => (
                        <React.Fragment key={i}>
                          <SubCategoryBox data={val} key={i} selectedTab={selectedTab} />
                        </React.Fragment>
                      ))
                    ) : (
                      <NoArticle title="No Article Found" />
                    )}
                  </div>
                </div>
              ) : (
                <NoArticle title="No Article Found" />
              )}
            </div>
          </Col>

          <Col lg={4} md={4}>
            <div className="side-items">
              <Title title="More Sub-Categories" underline />
              <div className="side-category-listing">
                {MoreCategoryData?.subCategoryLists?.length > 0 &&
                  MoreCategoryData?.subCategoryLists?.map((val, i) => (
                    <div
                      className={`category-item ${selectedCategory ||
                        (MoreCategoryData?.subcategoryname &&
                          selectedCategory === selectedCategory) ||
                        MoreCategoryData?.subcategoryname ===
                        MoreCategoryData?.subcategoryname
                        ? "active"
                        : ""
                        }`}
                      key={i}
                      onClick={() => handleCategory(val)}
                    >
                      <div className="image-wrapper">
                        {val.sub_category_image ? (
                          <img
                            src={`${BASE_URL}${val.sub_category_image}`}
                            alt="category-icon" id="imgPre"
                          />
                        ) : <img
                          src={AppImages.PlaceHolderImage}
                          alt="category-icon" id="imgPre"
                        />}
                      </div>
                      <div className="title">{val.sub_category_name}</div>
                    </div>
                  ))}
              </div>
            </div>
          </Col>
          {/* </Sidebar> */}
        </Row>
      </div>
    </AppComponent.MainLayout>
  );
};

export default SubCategoryListing;
