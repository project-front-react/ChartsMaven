import React from "react";
import { AppComponent } from "../../appData/appComponent";
import { AppImages } from "../../appData/appImages";
import "../pageStyles.scss";
import CustomButton from "../../components/Controls/Buttons";
import { useState } from "react";
import { useEffect } from "react";
import VideContentBox from "./VideContentBox";
import { getVideoArticle, saveSelectedTab } from "../../redux/Slices/VideoArticleSlice/videoArticleSlice";
import { useDispatch, useSelector } from "react-redux";
import NoArticle from "../../components/NoArticle";
import { scrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import PayaidPaymentForm from "../Subscription/PayAidDemo/PayAidDemo";

const VideoArticlesListing = (props) => {
  const dispatch = useDispatch();
  const getAllTags = useSelector((state) => state?.videoArticleData?.videotags);
  const getAllVideoArticles = useSelector(
    (state) => state?.videoArticleData?.videoArticleList.data
  );
  const TotalPage = useSelector(
    (state) => state?.videoArticleData?.videoArticleList?.total_page
  );
  console.log(TotalPage, "getallvideo");
  const { pageTitle } = props;
  console.log(pageTitle, "pagetitle")
  const [selectedTab, setSelectedTab] = useState("Premium");
  const [PageIndex, setPageIndex] = useState(9);
  const [sort, setSort] = useState(false);
  const [iconChange, setIconChange] = useState(false)
  const [active, setActive] = useState("dsc")
  console.log(selectedTab, "selectedtavfgf");
  const getSavedSelectedTab = useSelector((state) => state.videoArticleData.selectedTab)
  // handling tabs and api call accordingly
  const handleSelected = (data) => {
    setSelectedTab(data);
    dispatch(getVideoArticle({ tag: data, page_size: PageIndex }));
    dispatch(saveSelectedTab(data))
  };
  console.log(getSavedSelectedTab, "getSavedSelectedTab");
  useEffect(() => {
    if (getSavedSelectedTab) {
      setSelectedTab(getSavedSelectedTab)
      dispatch(getVideoArticle({ tag: getSavedSelectedTab, page_size: PageIndex }));
    }
  }, [])
  useEffect(() => {
    scrollToTop()
    dispatch(getVideoArticle({ page_size: PageIndex }));
  }, []);

  // handle pagination
  const getMoreData = () => {
    dispatch(
      getVideoArticle({
        tag: selectedTab,
        page_size: PageIndex + 9,
      })
    );
  };

  // handle sorting
  const HandleSort = (sortname) => {
    setActive(sortname)
    if (sortname === "asc") {
      setIconChange(true)
    } else if (sortname === "dsc") {
      setIconChange(false)
    }
    setSort(false);
    dispatch(
      getVideoArticle({
        tag: selectedTab,
        page_size: PageIndex,
        sort: sortname,
      })
    );
  };

  const handleOutsideClick = () => {
    sort && setSort(false);
  };
  return (
    <div onClick={handleOutsideClick}>
      <AppComponent.MainLayout header pageTitle={pageTitle} >
        <div className="categories">
          <div className="filter-options">
            <div className="tab-btn" id="tab-btn">
              {getAllTags?.length > 0 &&
                getAllTags.map((val, i) => (
                  <React.Fragment key={i}>
                    <CustomButton
                      cusClass={val === selectedTab ? "active" : ""}
                      text={val}
                      onClick={() => handleSelected(val)}
                    />
                  </React.Fragment>
                ))}
            </div>
            <span className="sorting" onClick={() => setSort(!sort)}>
              {iconChange === true ? <FaSortAmountUpAlt className="faIcon" /> : <FaSortAmountDownAlt className="faIcon" />}
            </span>
            {sort && (
              <div className="sorting_content" onClick={() => setSort(!sort)}>
                <p onClick={() => HandleSort("dsc")} className={`${active == "dsc" ? "active" : ""}`}>Newest To Oldest</p>
                <p onClick={() => HandleSort("asc")} className={`${active !== "dsc" && active != "" ? "active" : ""}`}>Oldest To Newest</p>
              </div>
            )}
          </div>
          <div className="category-listing">
            {getAllVideoArticles?.length > 0 ? (
              getAllVideoArticles?.map((val, i) => (
                <React.Fragment key={i}>
                  {console.log(val, "vallue")}
                  <VideContentBox data={val} selectedTab={selectedTab} />
                </React.Fragment>
              ))
            ) : (
              <NoArticle title="No Video article available at the moment" />
            )}

          </div>
          {/* <PayaidPaymentForm /> */}
          {TotalPage <= 1 ? (
            ""
          ) : (
            <div className="btnField">
              <AppComponent.Button
                onClick={() => getMoreData()}
                text="Load More"
              />
            </div>
          )}
        </div>
      </AppComponent.MainLayout>
    </div>
  );
};

export default VideoArticlesListing;
