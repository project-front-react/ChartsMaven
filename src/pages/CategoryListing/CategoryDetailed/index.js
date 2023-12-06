import React, { useEffect, useState } from "react";
import { AppComponent } from "../../../appData/appComponent";
import "../categoryListing.scss";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../components/Title";
import { AppImages } from "../../../appData/appImages";
import moment from "moment";
import LinkModal from "../../../layouts/LinkModal/LinkModal";
import { getCategoryDetail } from "../../../redux/Slices/getCategoryWiseList/getCategoryWiseList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { getArticleBookmarkAction } from "../../../redux/Slices/ArticleBookMarkSlice/ArticleBookMarkSlice";
import { getArticleCommentAction } from "../../../redux/Slices/CommentSlice/commentSlice";
import ArticleComment from "../../../components/CommentBox/ArticleComment";
import { scrollToTop } from "../../../components/ScrollToTop/ScrollToTop";
import { MdCalendarMonth } from "react-icons/md"
import {WiTime4} from "react-icons/wi"
import { BASE_URL } from "../../../utils/Constants";


//category detail page
const CategoryDetailed = ({ pageTitle }) => {
  const params = useParams();
  const { UID } = params;
  const state = useLocation();
  const navigate = useNavigate()

  console.log(state?.state?.article_tag?.article_tag,"stateDAta");
  const subCatData = useSelector((state) => state.pageData.subCategory);
  //article detail data
  const CategoryDetail = useSelector(
    (state) => state?.categoryWiseArticleList?.categoryWiseArticle?.data
  );
  //get article comment
  const getComments = useSelector((state) => state?.comment?.AllComments?.data);
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  const url = window.location.href;
  useEffect(() => {
  }, [UID, url]);

  useEffect(() => {
    dispatch(getCategoryDetail(UID));
    dispatch(getArticleCommentAction(UID));
  }, []);
  //to bookmark article
  const handleBookmarkAPI = (uuid) => {
    dispatch(getArticleBookmarkAction(uuid)).then((result) => {
      if (result.payload.status === 200) {
        dispatch(getCategoryDetail(uuid));
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
  return (
    <AppComponent.MainLayout header pageTag={state?.state?.article_tag?.article_tag} pageTitle={`${CategoryDetail?.title}`}>
      <div className="categories category-detailed">
        <Title title={CategoryDetail?.title} underline />
        <div className="cat-image">
          {CategoryDetail?.banner_image !== "/media/" ? (
            <img
              src={CategoryDetail?.banner_image ? `${BASE_URL}${CategoryDetail?.banner_image}` : AppImages.PlaceHolderImage}
              alt="banner-img" id="imgPre"
            />
          ) : (
            <img src={AppImages.PlaceHolderImage} alt="banner-img" id="imgPre"/>
          )}
        </div>
        <div className="detailed-content">
          <div className="content-additional">
            <div className="content">
              <div className="title">{subCatData.heading}</div>
              <div className="timings">
                {CategoryDetail?.show_date == true &&
                  <div className="date">
                    <div className="icon-wrapper">
                    <MdCalendarMonth />
                    </div>{" "}
                    Date:{" "}
                    {moment(CategoryDetail?.created_datetime).format(
                      "Do MMMM  YYYY"
                    )}
                  </div>}
                {CategoryDetail?.show_time == true &&
                  <div className="time">
                    <div className="icon-wrapper">
                     <WiTime4 />
                    </div>{" "}
                    Time:{" "}
                    {moment(CategoryDetail?.created_datetime).format("h:mm A")}
                  </div>}

              </div>
            </div>
            <div className="feature">
              <div className="icons">
                <div
                  className="icon-wrapper share-icon"
                  onClick={() => setShow(true)}
                >
                  <img src={AppImages.ShareIcon} alt="shareIcon" id="imgPre"/>
                </div>
                <LinkModal
                  showModel={show}
                  size={"md"}
                  handleClose={handleClose}
                />
                <div
                  className="icon-wrapper bookmark-icon"
                  onClick={() => handleBookmarkAPI(UID)}
                >
                  {CategoryDetail?.is_bookmarked === true ? (
                    <img src={AppImages.BookMarkWhite} alt="bookMarkIcon" id="imgPre"/>
                  ) : (
                    <img src={AppImages.BookmarkedIcon} alt="bookMarkIcon" id="imgPre"/>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="main-content"
            dangerouslySetInnerHTML={{ __html: CategoryDetail?.summary }}
          ></div>
          {token && <ArticleComment data={getComments} uuid={UID} />}
        </div>
      </div>
    </AppComponent.MainLayout>
  );
};

export default CategoryDetailed;
