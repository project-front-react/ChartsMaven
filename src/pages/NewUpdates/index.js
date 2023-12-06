import React, { useState } from "react";
import moment from "moment";
import { AppComponent } from "../../appData/appComponent";
import SidebarLayout from "../../layouts/SidebarLayout";
import SidebarMain from "../../layouts/SidebarLayout/MainLayout";
import { AppImages } from "../../appData/appImages";
import "../pageStyles.scss";
import "./newUpdates.scss";
import Title from "../../components/Title";
import Sidebar from "../../layouts/SidebarLayout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getNewUpdates,
  updatedNewUpdateList,
} from "../../redux/Slices/NewUpdates/newUpdatesSlice";
import { getArticleBookmarkAction } from "../../redux/Slices/ArticleBookMarkSlice/ArticleBookMarkSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { getArticleCommentAction } from "../../redux/Slices/CommentSlice/commentSlice";
import ArticleComment from "../../components/CommentBox/ArticleComment";
import LinkModal from "../../layouts/LinkModal/LinkModal";
import NoArticle from "../../components/NoArticle";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/Constants";
import { scrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import { CheckStatusAPI } from "../../redux/Slices/CheckStatus/checkstatusSlice";
import { Modal } from "react-bootstrap";
import { FaSortAmountDownAlt, FaSortAmountUpAlt, FaFilter } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md"
import {WiTime4} from "react-icons/wi"



const NewsUpdates = ({ pageTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articleContent = useSelector(
    (state) => state?.latestUpdates?.newUpdateList
  );

  const getComments = useSelector((state) => state?.comment?.AllComments?.data);

  const TotalPage = useSelector((state) => state?.latestUpdates?.TotalPage);
  const [selectedUpdate, setSelectedUpdate] = useState();
  const [getFirst, setGetFirs] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [show, setShow] = useState({ status: false, value: "" });
  const [filteredData, setFilteredData] = useState();
  const [sort, setSort] = useState(false);
  const [filterSubCat, setFilterSubCat] = useState("");
  const [countData, setCountData] = useState(0);
  const [closePopup, setClosePopup] = useState(false)
  const [test, setTest] = useState(0)
  const [iconChange, setIconChange] = useState(false)
  const [active, setActive] = useState("dsc")

  useEffect(() => {
    setFilteredData(articleContent?.data?.slice(0, pageSize));
  }, [articleContent?.data, pageSize]);
  //to set the default article
  useEffect(() => {
    if (articleContent?.data?.length > 0)
      setSelectedUpdate(articleContent?.data[countData]);
    scrollToTop();
  }, [articleContent?.data?.[countData]]);

  useEffect(() => {
    dispatch(getNewUpdates({ page_size: pageSize, sort: "dsc" }));
  }, []);

  useEffect(() => {
    let latestUpdateUUID = selectedUpdate && selectedUpdate?.uuid;
    console.log(latestUpdateUUID, "selectedUpdate");
    dispatch(getArticleCommentAction(latestUpdateUUID));
  }, [selectedUpdate?.uuid]);

  const onImageError = (e) => {
    e.target.src = AppImages.PlaceHolderImage;
  };
  // handle pagination
  const getMoreData = () => {
    const nextPageSize = pageSize + 6;
    dispatch(getNewUpdates({ page_size: nextPageSize, sort: "dsc" }));
    setPageSize(nextPageSize);
  };
  const HandleSort = (sortname) => {
    console.log("sortname", sortname)
    setActive(sortname)
    if (sortname === "asc") {
      setIconChange(true)
    } else if (sortname === "dsc") {
      setIconChange(false)
    }
    setSort(false);
    dispatch(
      getNewUpdates({
        page_size: pageSize,
        sort: sortname,
      })
    );
  };
  console.log(active, "activeclka");
  const handleShare = (item) => {
    setShow({
      ...show,
      status: true,
      value: `${window.location.origin}/charts-maven-frontend/#/new-updates/${item}`,
    });
  };
  useEffect(() => {
    dispatch(CheckStatusAPI());
  }, []);

  const token = localStorage.getItem("token");
  // alert(token);
  const handleBookMarkUpdates = (uuid) => {
    dispatch(getArticleBookmarkAction(uuid)).then((result) => {
      if (result.payload.status === 200) {
        let isBookmark = result.payload.data.is_bookmark;
        let updatedData = articleContent?.data?.map((item) => {
          if (item.uuid === uuid) {
            return {
              ...item, // Spread the existing properties of the object
              is_bookmarked: isBookmark, // Update the is_bookmarked property
            };
          }
          return item;
        });
        dispatch(
          updatedNewUpdateList({ ...articleContent, ["data"]: updatedData })
        );
        toast.success(result.payload.data.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Please login / signup for adding bookmark!", {
          cposition: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
      }
    });
  };

  const handleClose = () => {
    setShow({
      ...show,
      status: false,
    });
  };

  const handleOutsideClick = () => {
    sort && setSort(false);
    filterSubCat && setFilterSubCat(false);
  };
  const handleFilterSub = (e) => {
    if (e == "Indian") {
      const filteredArticles = articleContent?.data?.filter(
        (item) =>
          item.sub_category?.article_category?.category_name === "Indian"
      );
      setFilteredData(filteredArticles?.slice(0, pageSize));
    } else if (e == "Globals") {
      const filteredArticles = articleContent?.data?.filter(
        (item) =>
          item.sub_category?.article_category?.category_name === "Globals"
      );
      setFilteredData(filteredArticles?.slice(0, pageSize));
    } else if (e == "All") {
      const filteredArticles = articleContent?.data?.filter(
        (item) => item.sub_category?.article_category?.category_name
      );
      setFilteredData(filteredArticles?.slice(0, pageSize));
    }
  };

  const subscribedstatus = useSelector(
    (state) => state?.subscriptionAllDetails?.subscriptedStatus
  );

  const handleNavigateToPlan = () => {
    console.log("called");
    if (token && subscribedstatus == false) {
      setClosePopup(true)

      // navigate("/get-subscription")
    } else {
      setClosePopup(true)
      // navigate("/login")
    }

  };
  useEffect(() => {
    if (test > 0) {
      if (selectedUpdate?.premium == false) {
        console.log("called if");
      } else if (selectedUpdate?.premium == true && subscribedstatus == true) {
        console.log("called else if");

      } else {
        handleNavigateToPlan()
      }
    }

  }, [test])

  const handleClosePopup = () => {
    setClosePopup(false);
  };

  const renderContent = () => {
    switch (true) {
      case selectedUpdate?.premium == true && subscribedstatus == true:
        return (
          <div className="main-content">
            <Title title={selectedUpdate?.title} underline />
            <div className="cat-image">
              <img
                src={
                  selectedUpdate?.banner_image
                    ? `${BASE_URL}${selectedUpdate?.banner_image}`
                    : AppImages.PlaceHolderImage
                }
                alt="banner-img"
                onError={onImageError}
                id="imgPre"
              />
            </div>
            <div className="detailed-content">
              <div className="content-additional">
                <div className="content">
                  <div className="title">{selectedUpdate?.title}!!</div>
                  <div className="timings">
                    {selectedUpdate?.show_date == true &&
                      <div className="date">
                        <div className="icon-wrapper">
                        <MdCalendarMonth />
                        </div>{" "}
                        Date:
                        {moment(selectedUpdate?.created_datetime).format(
                          " Do MMMM  YYYY"
                        )}
                      </div>
                    }
                    {selectedUpdate?.show_time == true &&
                      <div className="time">
                        <div className="icon-wrapper">
                        <WiTime4 />
                        </div>{" "}
                        Time:{" "}
                        {moment(selectedUpdate?.created_datetime).format(
                          "h:mm A"
                        )}
                      </div>
                    }
                  </div>
                </div>
                <div className="feature">
                  <div className="icons">
                    <div
                      className="icon-wrapper share-icon"
                      onClick={() =>
                        handleShare(selectedUpdate && selectedUpdate?.uuid)
                      }
                    >
                      <img src={AppImages.ShareIcon} alt="shareIcon" id="imgPre" />
                    </div>
                    <LinkModal
                      showModel={show?.status}
                      data={show.value}
                      size={"md"}
                      handleClose={handleClose}
                    />
                    <div
                      className="icon-wrapper bookmark-icon"
                      onClick={() =>
                        handleBookMarkUpdates(
                          selectedUpdate && selectedUpdate?.uuid
                        )
                      }
                    >
                      {selectedUpdate &&
                        selectedUpdate?.is_bookmarked === true ? (
                        <img
                          src={AppImages.BookMarkWhite}
                          alt="bookMarkIcon" id="imgPre"
                        />
                      ) : (
                        <img
                          src={AppImages.BookmarkedIcon}
                          alt="bookMarkIcon" id="imgPre"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="main-content"
                dangerouslySetInnerHTML={{
                  __html: selectedUpdate?.summary,
                }}
              ></div>
              {token && (
                <ArticleComment
                  data={getComments}
                  uuid={selectedUpdate && selectedUpdate?.uuid}
                />
              )}
            </div>
          </div>
        );
      case selectedUpdate?.premium == false:
        return (
          <div className="main-content">
            <Title title={selectedUpdate?.title} underline />
            <div className="cat-image">
              <img
                src={
                  selectedUpdate?.banner_image
                    ? `${BASE_URL}${selectedUpdate?.banner_image}`
                    : AppImages.PlaceHolderImage
                }
                alt="banner-img"
                onError={onImageError}
                id="imgPre"
              />
            </div>
            <div className="detailed-content">
              <div className="content-additional">
                <div className="content">
                  <div className="title">{selectedUpdate?.title}</div>
                  <div className="timings">
                    {selectedUpdate?.show_date == true &&
                      <div className="date">
                        <div className="icon-wrapper">
                        <MdCalendarMonth />
                        </div>{" "}
                        Date:
                        {moment(selectedUpdate?.created_datetime).format(
                          " Do MMMM  YYYY"
                        )}
                      </div>
                    }
                    {selectedUpdate?.show_time == true &&
                      <div className="time">
                        <div className="icon-wrapper">
                        <WiTime4 />
                        </div>{" "}
                        Time:{" "}
                        {moment(selectedUpdate?.created_datetime).format(
                          "h:mm A"
                        )}
                      </div>
                    }
                  </div>
                </div>
                <div className="feature">
                  <div className="icons">
                    <div
                      className="icon-wrapper share-icon"
                      onClick={() =>
                        handleShare(selectedUpdate && selectedUpdate?.uuid)
                      }
                    >
                      <img src={AppImages.ShareIcon} alt="shareIcon" id="imgPre" />
                    </div>
                    <LinkModal
                      showModel={show?.status}
                      data={show.value}
                      size={"md"}
                      setShow={setShow}
                      handleClose={handleClose}
                    />
                    <div
                      className="icon-wrapper bookmark-icon"
                      onClick={() =>
                        handleBookMarkUpdates(
                          selectedUpdate && selectedUpdate?.uuid
                        )
                      }
                    >
                      {selectedUpdate &&
                        selectedUpdate?.is_bookmarked === true ? (
                        <img
                          src={AppImages.BookMarkWhite}
                          alt="bookMarkIcon" id="imgPre"
                        />
                      ) : (
                        <img
                          src={AppImages.BookmarkedIcon}
                          alt="bookMarkIcon" id="imgPre"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="main-content"
                dangerouslySetInnerHTML={{
                  __html: selectedUpdate?.summary,
                }}
              ></div>
              {token && (
                <ArticleComment
                  data={getComments}
                  uuid={selectedUpdate && selectedUpdate?.uuid}
                />
              )}
            </div>
          </div>
        );
      default:
        return (
          <>
            Get Subscribed To Watch This Article
          </>
        )
    }
  };

  return (
    <AppComponent.MainLayout header pageTitle={pageTitle}>
      <div
        className="categories sub-category inner-page new-updates"
        onClick={handleOutsideClick}
      >
        <div className="filter-options text-end my-4">
          <span className="sorting" onClick={() => setSort(!sort)}>
            {iconChange === true ? <FaSortAmountUpAlt className="faIcon" /> : <FaSortAmountDownAlt className="faIcon" />}
          </span>
          {sort && (
            <div className="sorting_content" onClick={() => setSort(!sort)}>
              <p onClick={() => HandleSort("dsc")} className={`${active == "dsc" ? "active" : ""}`}>Newest To Oldest</p>
              <p onClick={() => HandleSort("asc")} className={`${active !== "dsc" && active != "" ? "active" : ""}`}>Oldest To Newest</p>
            </div>
          )}
          <span
            className="filtering"
            onClick={() => setFilterSubCat(!filterSubCat)}
          >
            <FaFilter className="faIcon" />
          </span>
          {filterSubCat && (
            <div className="filter_content" onClick={() => setSort(!sort)}>
              <p onClick={() => handleFilterSub("All")}>All</p>
              <p onClick={() => handleFilterSub("Indian")}>Indian</p>
              <p onClick={() => handleFilterSub("Globals")}>Globals</p>
            </div>
          )}
        </div>
        <SidebarLayout>
          <SidebarMain>
            {renderContent()}
          </SidebarMain>
          <Sidebar>
            <div className="side-items">
              <div className="titleData">
                <Title title="Recent Articles" underline />
              </div>
              <div className="side-category-listing">
                <div>
                  <div className="sideCateoryData">
                    {filteredData?.length > 0 ? (
                      filteredData
                        ?.slice(getFirst, filteredData?.length - 1)
                        .map((val, i) => (
                          <div
                            className="side-item"
                            key={i}
                            onClick={() => {
                              setSelectedUpdate(val);
                              setGetFirs(0);
                              setCountData(i);
                              setTest(test + 1)
                            }}
                          >
                            <div
                              className="image-wrapper"
                              style={{
                                position: "relative",
                              }}
                            >
                              {val?.premium === true && (
                                <div>
                                  <div className="premiumWrapper">
                                    <p className="premiumTag">
                                      <img
                                        src={AppImages.PremiumIcon}
                                        alt="" id="imgPre"
                                        style={{
                                          height: "20px",
                                        }}
                                      />{" "}
                                      PREMIUM
                                    </p>
                                  </div>
                                </div>
                              )}
                              <img
                                src={
                                  val.banner_image
                                    ? `${BASE_URL}${val.banner_image}`
                                    : AppImages.PlaceHolderImage
                                }
                                alt={val.title}
                                onError={onImageError}
                              />
                            </div>
                            <h2>{val.title}</h2>
                          </div>
                        ))
                    ) : (
                      <NoArticle title="No Recent Article Found" />
                    )}
                  </div>
                  <Modal show={closePopup} onHide={handleClosePopup} size="xl" centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <div className=" modal-main w-100" id="detModalData">
                        <div className="modal_img">
                          <div className="ImageSection">
                            <img src={AppImages.signup} alt="brand-logo" id="imgPre" />
                          </div>
                        </div>
                        <div className="premium-modal subscription-detail-modal">
                          <h1 className="title-modal subscription-modal">{!token ? "You Have to Login First" : "You have to buy subscription plan to watch this article"}</h1>
                          <p className="sub-title-subscription">{!token ? "Login" : "Subscription"}</p>
                          <div className="d-flex button-box-sub">
                            <button className="login-btn" onClick={() => { !token ? navigate("/login") : navigate("/get-subscription") }}>
                              {!token ? "Login" : "Subscription"}
                            </button>
                            <button className="cancel-btn" onClick={handleClosePopup}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  <div className="arrowData">
                    {TotalPage <= 1 ? (
                      ""
                    ) : (
                      <button style={{background:"transparent"}}
                        onClick={() => getMoreData()}
                      >
                        <img src={AppImages.LoadMore} alt="load-icon" id="imgPre" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Sidebar>
        </SidebarLayout>
      </div>
    </AppComponent.MainLayout>
  );
};

export default NewsUpdates;
