import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/Controls/Buttons";
import BookmarkedData from "../../../appData/bookmarked.json";
import "../../pageStyles.scss";
import ArticleBox from "../../../components/ArticleBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookmarkArticleAction,
  getBookmarkVideoArticleAction,
} from "../../../redux/Slices/BookmarkSlice/bookmarkSlice";
import { useNavigate } from "react-router";
import NoArticle from "../../../components/NoArticle";

const Bookmarked = () => {
  const { bookmarked_tag, data } = BookmarkedData;
  const [selectedTab, setSelectedTab] = useState("Bookmarked Articles");
  const [filteredData, setFilterData] = useState(null);
  const navigate = useNavigate()

  const handleSelected = (data) => {
    setSelectedTab(data);
    if (data === "Bookmarked Articles") {
      dispatch(getBookmarkArticleAction());
    } else {
      dispatch(getBookmarkVideoArticleAction());
    }
  };

  const filteredArticles = data.filter((item) => {
    return item.bookmarked_tag.tag_name === selectedTab;
  });
  const articleContent = useSelector(
    (state) => state?.bookmarkedData?.bookmarkedArticles?.data
  );
  const articleVideoContent = useSelector(
    (state) => state?.bookmarkedData?.bookmarkedVideoArticles?.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setFilterData(filteredArticles);
  }, [selectedTab]);
  
  useEffect(() => {
    dispatch(getBookmarkArticleAction());
  }, []);

  return (
    <div className="bookmarked-section">
      <div className="filter-options">
        <div className="tab-btn" id="tab-btn">
          {bookmarked_tag?.length > 0 &&
            bookmarked_tag?.map((val, i) => (
              <React.Fragment key={i}>
                <CustomButton
                  cusClass={val === selectedTab ? "active" : ""}
                  text={val}
                  onClick={() => handleSelected(val)}
                />
              </React.Fragment>
            ))}
          <span
            style={{
              color: "#EA0A3B",
              marginLeft: "1rem",
              fontSize: "1rem",
              fontWeight: "700",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/bookmarkedarticlelists", { state: selectedTab })}
          >
            View All
          </span>
        </div>
      </div>
      <div className="bookmarked-listing">
        {selectedTab === "Bookmarked Articles" ? (
          articleContent?.data?.length > 0 ? (
            articleContent.data.map((val, i) => (
              <React.Fragment key={i}>
                <ArticleBox data={val} />
              </React.Fragment>
            ))
          ) : (
            <NoArticle title="Not added any articles in bookmark yet" />
          )
        ) : (
          articleVideoContent !== undefined &&
            articleVideoContent?.data?.length > 0 ? (
            articleVideoContent.data.map((val, i) => (
              <React.Fragment key={i}>
                <ArticleBox data={val} />
              </React.Fragment>
            ))
          ) : (
            <NoArticle title="Not added video articles in bookmark yet" />
          )
        )}
      </div>
    </div>
  );
};

export default Bookmarked;
