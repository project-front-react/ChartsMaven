import React from "react";
import "./videoContentBox.scss";
import { AppImages } from "../../../appData/appImages";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/Constants";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CheckStatusAPI } from "../../../redux/Slices/CheckStatus/checkstatusSlice";
import { MdCalendarMonth } from "react-icons/md";
import { WiTime4 } from "react-icons/wi"


const VideContentBox = (props) => {
  const { data, selectedTab } = props;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const formattedDate = date.toLocaleDateString("en-US");
  // const formattedTime = date.toLocaleTimeString("en-US");
  const onImageError = (e) => {
    e.target.src = AppImages.PlaceHolderImage;
  };
  let result = data?.video_article_name.trim().replace(/\s/g, "-");
  const NavigateToDetailedPage = () => {
    navigate(`/video-articles-detailed/${data.uuid}`, { state: selectedTab });
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
  useEffect(() => {
    dispatch(CheckStatusAPI());
  }, []);
  // const subscribptionstatus = localStorage.getItem("SubscriptionStatus");
  const subscribptionstatus = useSelector(
    (state) => state?.subscriptionAllDetails?.subscriptedStatus
  );
  const NavigateTosubscription = () => {
    if (token && subscribptionstatus === true) {
      console.log(selectedTab, "dataselectedinnnn");
      navigate(`/video-articles-detailed/${data.uuid}`, { state: selectedTab });
    } else if (token && subscribptionstatus === false) {
      navigate("/get-subscription");
    } else {
      toast.error("Please Login to continue!");
      navigate("/login");
    }
  };
  return (
    <div
      className="videoCategoryBox-item"
      bookmarked={data.is_bookmarked}
      id={data.uuid}
      tag={data.video_tag.tag_name}
      onClick={
        data?.premium === true ? NavigateTosubscription : NavigateToDetailedPage
      }
    >
      <div className="thumbnail-wrapper" >
        {data?.premium === true && (
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
        )}

        <img
          src={
            data?.youtube_link
              ? youtubeThumbnail
              : BASE_URL + data?.video_thumbnail
          }
          id="imgPre"
          alt={`category-icon`}
          onError={onImageError}
        />
        <i className="playIcon">
          {data?.youtube_link ? (
            <img src={AppImages.PlayIcon} alt="play-icon" id="imgPre" />
          ) : (
            <img src={AppImages.BlueVideoIcon} alt="play-icon" id="imgPre" />
          )}
        </i>
      </div>
      <div className="video-content">
        <h5>{data?.video_article_name}</h5>
        <div className="timings">
          {data?.show_date == true &&
            <div className="date">
              <div className="icon-wrapper">
                <MdCalendarMonth />
              </div>{" "}
              Date: {moment(data?.created_datetime).format("DD MMM yyyy")}
            </div>
          }
          {data?.show_time == true &&
            <div className="time">
              <div className="icon-wrapper">
                <WiTime4 />
              </div>{" "}
              Time: {moment(data?.created_datetime).format("LT")}
            </div>}

        </div>
      </div>
    </div>
  );
};

export default VideContentBox;
