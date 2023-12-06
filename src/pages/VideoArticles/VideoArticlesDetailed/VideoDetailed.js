import React, { useEffect } from "react";
import { AppComponent } from "../../../appData/appComponent";
import "./videoDetailed.scss";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../components/Title";
import { AppImages } from "../../../appData/appImages";
import CommentBox from "../../../components/CommentBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getVideoArticleDetailed } from "../../../redux/Slices/VideoArticleSlice/videoArticleSlice";
import moment from "moment";
import ReactPlayer from "react-player/youtube";
import { BASE_URL } from "../../../utils/Constants";
import { getBookmarkAction } from "../../../redux/Slices/BookmarkSlice/bookmarkSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import LinkModal from "../../../layouts/LinkModal/LinkModal";
import { getAllCommentAction } from "../../../redux/Slices/CommentSlice/commentSlice";
import { scrollToTop } from "../../../components/ScrollToTop/ScrollToTop";
import { MdCalendarMonth } from "react-icons/md";
import { WiTime4 } from "react-icons/wi"


const VideoDetailed = ({ pageTitle }) => {
  const params = useParams();
  const state = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const { uuid } = params;
  const navigate = useNavigate();
  const SingleVideoArticle = useSelector(
    (state) => state?.videoArticleData?.singleVideoList
  );
  console.log(SingleVideoArticle, "dddd");
  // comment get all
  const getComments = useSelector((state) => state?.comment?.AllComments?.data);
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    dispatch(getVideoArticleDetailed(uuid));
    dispatch(getAllCommentAction(uuid));
  }, [uuid]);

  // handle bookmark api

  const handleBookmarkAPI = (uuid) => {
    dispatch(getBookmarkAction(uuid)).then((result) => {
      if (result.payload.status === 200) {
        dispatch(getVideoArticleDetailed(uuid));
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

  // close modal
  const handleClose = () => {
    setShow(false);
  };

  return (
    <AppComponent.MainLayout
      header
      pageTag={state?.state}
      pageTitle={SingleVideoArticle?.data?.video_article_name}
    >
      <div className="videoarticle video-detailed">
        <Title title={SingleVideoArticle?.data?.video_article_name} underline />
        <div className="cat-image">
          {SingleVideoArticle?.data?.is_youtube === true ? (
            <ReactPlayer
              url={SingleVideoArticle?.data?.youtube_link}
              height="100%"
              width="100%"
              controls={true}
              playing={true}
            />
          ) : (
            <video
              src={BASE_URL + SingleVideoArticle?.data?.article_video}
              controls
              autoPlay
              height="100%"
              width="100%"
              style={{
                objectFit: "cover",
              }}
              allow="autoplay"
            />
          )}
        </div>
        <div className="detailed-content">
          <div className="content-additional">
            <div className="content">
              <div className="title">
                {SingleVideoArticle?.data?.video_article_name}
              </div>
              <div className="timings">
                {SingleVideoArticle?.data?.show_date == true &&
                  <div className="date">
                    <div className="icon-wrapper">
                      <MdCalendarMonth />
                    </div>{" "}
                    Date:{" "}
                    {moment(SingleVideoArticle?.data?.created_datetime).format(
                      "MMM Do YYYY"
                    )}
                  </div>}
                {SingleVideoArticle?.data?.show_time == true &&
                  <div className="time">
                    <div className="icon-wrapper">
                      <WiTime4 />
                    </div>{" "}
                    Time:{" "}
                    {moment(SingleVideoArticle?.data?.created_datetime).format(
                      "LT"
                    )}
                  </div>
                }
              </div>
            </div>
            <div className="feature">
              <div className="icons">
                <div
                  className="icon-wrapper share-icon"
                  onClick={() => setShow(true)}
                >
                  <img src={AppImages.ShareIcon} alt="shareIcon" id="imgPre" />
                </div>
                <LinkModal
                  showModel={show}
                  size={"md"}
                  handleClose={handleClose}
                />
                <div
                  className="icon-wrapper bookmark-icon"
                  onClick={() =>
                    handleBookmarkAPI(SingleVideoArticle?.data?.uuid)
                  }
                >
                  {SingleVideoArticle?.data?.is_bookmarked === true ? (
                    <img src={AppImages.BookMarkWhite} alt="bookMarkIcon" id="imgPre" />
                  ) : (
                    <img src={AppImages.BookmarkedIcon} alt="bookMarkIcon" id="imgPre" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="main-content"
            dangerouslySetInnerHTML={{
              __html: SingleVideoArticle?.data?.summary,
            }}
          ></div>
          {token && <CommentBox data={getComments} uuid={uuid} />}
        </div>
      </div>
    </AppComponent.MainLayout>
  );
};

export default VideoDetailed;
