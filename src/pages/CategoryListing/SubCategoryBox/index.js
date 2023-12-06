import React from "react";
import { AppImages } from "../../../appData/appImages";
import "../categoryListing.scss";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleBookmarkAction } from "../../../redux/Slices/ArticleBookMarkSlice/ArticleBookMarkSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
// import LinkModal from '../../../layouts/LinkModal';
import LinkModal from "../../../layouts/LinkModal/LinkModal";
import { BASE_URL } from "../../../utils/Constants";
import { updateCategoryWiseArticle } from "../../../redux/Slices/getCategoryWiseList/getCategoryWiseList";
import { useEffect } from "react";
import { CheckStatus } from "../../../redux/Slices/SubscriptionSlice/SubscriptionSlice";
import { CheckStatusAPI } from "../../../redux/Slices/CheckStatus/checkstatusSlice";
import { MdCalendarMonth } from "react-icons/md"
import { WiTime4 } from "react-icons/wi"
import { Modal } from "react-bootstrap";


//category wise list box
const SubCategoryBox = ({ data, onClick, selectedTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState({ status: false, value: "" });
  const [closePopup, setClosePopup] = useState(false)

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const subscribedstatus = useSelector(
    (state) => state?.subscriptionAllDetails?.subscriptedStatus
  );

  const handleNavigate = (id) => {
    const UID = id.uuid;
    if (!id) {
      return;
    }

    // navigate(`/categorydetail/${UID}`, { state: id });
    if (token && subscribedstatus === true) {
      navigate(`/categorydetail/${UID}`, { state: id, selectedTab });
    } else if (token && subscribedstatus === false) {
      // navigate("/get-subscription");
      setClosePopup(true)

    } else {
      setClosePopup(true)

      // toast.error("Please Login to continue!");
      // navigate("/login");
    }
  };

  const CatWiseArticleData = useSelector(
    (state) => state.categoryWiseArticleList.categoryWiseArticle
  );

  const handleBookmarkAPI = (uuid) => {
    dispatch(getArticleBookmarkAction(uuid)).then((result) => {
      if (result.payload.status === 200) {
        let isBookmark = result.payload.data.is_bookmark;
        let latestData = CatWiseArticleData.data.map((item) => {
          if (item.uuid === uuid) {
            return {
              ...item, // Spread the existing properties of the object
              is_bookmarked: isBookmark, // Update the is_bookmarked property
            };
          }
          return item; // Return the unchanged object if the uuid doesn't match
        });
        dispatch(updateCategoryWiseArticle(latestData));
        // dispatch(getCategoryWiseArticle(id));
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

  const handleShare = (item) => {
    setShow({
      ...show,
      status: true,
      value: `${window.location.origin}/charts-maven-frontend/#/categorydetail/${item}`,
    });
  };

  const handleClose = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(CheckStatusAPI());
  }, []);

  const NavigateTosubscription = (id) => {
    // const UID =
    const UID = id.uuid;

    navigate(`/categorydetail/${UID}`, { state: id, selectedTab });
  };

  const handleClosePopup = () => {
    setClosePopup(false);
  };

  return (
    <div className="subcategory-item">
      <div
        className="left-image"
        onClick={
          data?.premium == true
            ? () => {
              handleNavigate(data);
            }
            : () => {
              NavigateTosubscription(data);
            }
        }
      // style={{
      //   position: "relative",
      // }}
      >
        {data?.premium === true && (
          <div>
            <div className="premiumWrapper">
              <p className="premiumTag">
                <img
                  src={AppImages.PremiumIcon}
                  alt="" id="imgPre"
                />{" "}
                PREMIUM
              </p>
            </div>
          </div>
        )}
        <img
          src={
            data?.banner_image !== "/media/"
              ? `${BASE_URL}${data?.banner_image}`
              : AppImages.PlaceHolderImage
          }
          id="imgPre"
          alt={data.heading}
          style={{
            height: "166px",
            width: "100%",
          }}
        />
      </div>
      <div className="right-content">
        <div className="content">
          <div
            className="title"
            onClick={
              data?.premium == true
                ? () => {
                  handleNavigate(data);
                }
                : () => {
                  NavigateTosubscription(data);
                }
            }
          >
            {data.title}
          </div>
          <div className="timings">
            {data?.show_date == true &&
              <div className="date">
                <div className="icon-wrapper">
                  <MdCalendarMonth />
                </div>{" "}
                Date: {moment(data?.created_datetime).format("Do MMMM  YYYY")}
                {data.date}
              </div>
            }
            {data?.show_time == true &&
              <div className="time">
                <div className="icon-wrapper">
                  <WiTime4 />
                </div>{" "}
                Time: {moment(data?.created_datetime).format("h:mm A")}
              </div>}
          </div>
        </div>
        <div className="icons">
          <div
            className="icon-wrapper share-icon"
            onClick={() => handleShare(data.uuid)}
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
            onClick={() => handleBookmarkAPI(data.uuid)}
          >
            {data?.is_bookmarked === true ? (
              <img src={AppImages.BookMarkWhite} alt="bookMarkIcon" id="imgPre" />
            ) : (
              <img src={AppImages.BookmarkedIcon} alt="bookMarkIcon" id="imgPre" />
            )}
          </div>
        </div>
      </div>
      <Modal show={closePopup} onHide={handleClosePopup} size="xl" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-main w-100" id="detModalData">
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
    </div>
  );
};

export default SubCategoryBox;
