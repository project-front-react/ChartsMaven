import React from "react";
import "./articleBox.scss";
import { AppImages } from "../../appData/appImages";
import { BASE_URL, TEST_URL } from "../../utils/Constants";
import {
  getArticleBookmarkListingAction,
  getBookmarkAction,
  getBookmarkArticleAction,
  getBookmarkVideoArticleAction,
} from "../../redux/Slices/BookmarkSlice/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import LinkModal from "../../layouts/LinkModal/LinkModal";
import { toast } from "react-toastify";
import { MdCalendarMonth } from "react-icons/md"
import { WiTime4 } from "react-icons/wi"

const ArticleBox = (props) => {
  const { data, onClick } = props;
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(null);
  const date = new Date(data.created_datetime);
  const dispatch = useDispatch();
  const formattedDate = date.toLocaleDateString("en-US");
  const formattedTime = date.toLocaleTimeString("en-US");
  const navigate = useNavigate();

  const subscribedstatus = useSelector(
    (state) => state?.subscriptionAllDetails?.subscriptedStatus
  );
  console.log(subscribedstatus, "subb");
  const token = localStorage.getItem("token");

  const handleBookmarkAPI = (uuid, bannerimg, video_thumbnail) => {
    if (video_thumbnail) {
      dispatch(getBookmarkAction(uuid)).then((result) => {
        if (result.payload.status === 200) {
          // statusOfBookmarkAPI(result.payload.status);
          dispatch(getBookmarkVideoArticleAction());
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
    } else {
      dispatch(getArticleBookmarkListingAction(uuid)).then((result) => {
        if (result.payload.status === 200) {
          // statusOfBookmarkAPI(result.payload.status);
          dispatch(getBookmarkArticleAction());
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
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  // extracting youtube thumbnail
  const extractYoutubeThumbnail = (youtubeLink) => {
    const videoId = extractVideoId(youtubeLink);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }
    return null;
  };

  const extractVideoId = (youtubeLink) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = youtubeLink.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const youtubeThumbnail = data?.youtube_link
    ? extractYoutubeThumbnail(data?.youtube_link)
    : null;

  const handleNavigateToDetail = (uuid, thumbnail) => {
    if (thumbnail) {
      navigate(`/video-articles-detailed/${uuid}`);
    } else {
      navigate(`/categorydetail/${uuid}`);
    }
  };

  const handleModal = (id, thumbnail) => {
    setShow(true);
    if (thumbnail) {
      setUrl(TEST_URL + "video-articles-detailed/" + id);
    } else {
      setUrl(TEST_URL + "categorydetail/" + id);
    }
  };
  const handleNavigate = (uuid, thumbnail) => {

    // navigate(`/categorydetail/${UID}`, { state: id });
    if (token && subscribedstatus === true && thumbnail) {
      navigate(`/video-articles-detailed/${uuid}`);
    } else if (token && subscribedstatus === true && uuid) {
      navigate(`/categorydetail/${uuid}`);
    } else if (token && subscribedstatus === false) {
      navigate("/get-subscription");
    } else {
      toast.error("Please Login to continue!");
      navigate("/login");
    }
  };
  return (
    <div className="subcategory-item" onClick={onClick}>
      <LinkModal
        showModel={show}
        size={"md"}
        handleClose={handleClose}
        url={url}
      />
      <div
        className="left-image"
        role="button"
        onClick={
          data?.premium == true
            ? () => {
              handleNavigate(data.uuid, data?.video_thumbnail);
            }
            : () => {
              handleNavigateToDetail(data.uuid, data?.video_thumbnail)
            }
        }
      >
        {data?.premium === true && (
          <div>
            <div className="premiumWrapper">
              <p className="premiumTag">
                <img
                  src={AppImages.PremiumIcon}
                  alt=""
                  id="imgPre"
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
            data?.banner_image !== "/media/"
              ? BASE_URL + data?.banner_image
              : data?.youtube_link
                ? data?.video_thumbnail
                : youtubeThumbnail
                  ? BASE_URL + data?.video_thumbnail
                  : AppImages.PlaceHolderImage
          }
          alt="banner-img"
          id="imgPre"
        />
      </div>
      <div className="right-content">
        <div className="content">
          <div className="title"
            onClick={
              data?.premium == true
                ? () => {
                  handleNavigate(data.uuid, data?.video_thumbnail);
                }
                : () => {
                  handleNavigateToDetail(data.uuid, data?.video_thumbnail)
                }
            }
            style={{ cursor: "pointer" }}
          >
            {data?.title ? data?.title : data?.video_article_name}
          </div>
          <div className="timings">
            {data?.show_date == true &&
              <div className="date">
                <div className="icon-wrapper">
                  <MdCalendarMonth />
                </div>
                Date: {formattedDate}
              </div>}
            {data?.show_time == true &&
              <div className="time">
                <div className="icon-wrapper">
                  <WiTime4 />
                </div>{" "}
                Time: {formattedTime}
              </div>
            }
          </div>
        </div>
        <div className="icons">
          <div
            className="icon-wrapper share-icon"
            onClick={() => handleModal(data?.uuid, data?.video_thumbnail)}
          >
            <img src={AppImages.ShareIcon} alt="shareIcon" id="imgPre" />
          </div>
          <div
            className="icon-wrapper bookmark-icon"
            onClick={() =>
              handleBookmarkAPI(
                data?.uuid,
                data?.banner_image,
                data?.video_thumbnail
              )
            }
          >
            {data?.is_bookmarked === true ? (
              <img src={AppImages.BookMarkWhite} alt="bookMarkIcon" id="imgPre" />
            ) : (
              <img src={AppImages.BookmarkedIcon} alt="bookMarkIcon" id="imgPre" />
              // nothhing
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleBox;
