import React, { useState } from "react";
import "./Notification.scss";
import { AppImages } from "../../appData/appImages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CheckStatusAPI } from "../../redux/Slices/CheckStatus/checkstatusSlice";
import { notificationStatusCheck } from "../../redux/Slices/NotificationModuleSlices/notificationStatusCheckSlice/notificationStatusCheckSlice";
import { getNotificationList } from "../../redux/Slices/NotificationModuleSlices/GetNotificationListSLice/GetNotificationListSlice";
import { AppComponent } from "../../appData/appComponent";
import { useRef } from "react";

const Notification = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const [pageSize, setPageSize] = useState(10);
  const [closePopup, setClosePopup] = useState(false)
  const listRef = useRef(null);

  //notification list
  const NotificationLists = useSelector((state) => state?.getNotificationLIst?.GetNotificationList)
  //for pagination
  const TotalPage = useSelector((state) => state?.getNotificationLIst?.TotalNotificationPage);
  console.log(TotalPage, "notiiii");
  //for status check
  const SubscriptionStatusCheck = useSelector((state) => state?.subscriptionAllDetails?.subscriptedStatus);

  const dispatch = useDispatch()

  //get notificationList
  useEffect(() => {
    dispatch(getNotificationList({ page_size: pageSize }))
  }, [])

  //subscription statuscheck
  useEffect(() => {
    dispatch(CheckStatusAPI())
  }, [])

  //pagination
  const getMoreDataNotification = () => {
    const nextPageSize = pageSize + 4;
    dispatch(getNotificationList({ page_size: nextPageSize }));
    setPageSize(nextPageSize);
  };

  //navigation function from list
  const handleNavigateToPage = (e) => {
    setIsOpen(false)
    let id = e.uuid;
    console.log(id, "uuid")
    dispatch(notificationStatusCheck(id));

    switch (e.title) {
      case "Video Article":
      case "Video article comment":
        if (e?.premium === true && SubscriptionStatusCheck === true) {
          navigate(`/video-articles-detailed/${e.title_id}`);
        } else if (e?.premium === false) {
          navigate(`/video-articles-detailed/${e.title_id}`);
        }
        break;

      case "Article":
      case "Article Comment":
        if (e?.premium === true && SubscriptionStatusCheck === true) {
          navigate(`/categorydetail/${e.title_id}`);
        } else if (e?.premium === false) {
          navigate(`/categorydetail/${e.title_id}`);
        }
        break;

      case "Comment Deleted":
      case "Replied on comment":
        if (e.title_type === "Article") {
          if (e.premium === false) {
            navigate(`/categorydetail/${e.title_id}`);
          } else if (e.premium === true && SubscriptionStatusCheck === true) {
            navigate(`/categorydetail/${e.title_id}`);
          }
        } else {
          if (e?.premium === true && SubscriptionStatusCheck === true) {
            navigate(`/video-articles-detailed/${e.title_id}`);
          } else if (e?.premium === false) {
            navigate(`/video-articles-detailed/${e.title_id}`);
          }
        }
        break;

      case "Subscription Created Successfully":
        navigate("/get-subscription");
        break;

      case "Profile Created Successfully":
        navigate("/profile");
        break;

      default:
        setClosePopup(true)
        break;
    }
    // window.location.reload(true);
  };

  //popup state managment
  const handleClosePopup = () => {
    setClosePopup(false);
  };
  const token = localStorage.getItem("token");


  return (
    // <AppComponent.MainLayout>
    <div>
      <div className="notificationContainer">
        <h4>Notification</h4>
        <div className="notification_list_main p-2" >
          {NotificationLists?.data?.length > 0 ?
            NotificationLists?.data?.map((item, id) => (
              <div className="notiData" key={id} >
                <div className="imgWrapper">
                  <img src={AppImages.Logo} alt="noti-icn" />
                </div>
                <div className="notiText">
                  <p>
                    {item.message}
                    {/* <span>{item.comment}</span> */}
                  </p>

                  <div className={"notiTimeButton"}>
                    <button onClick={(e) => { e.stopPropagation(); handleNavigateToPage(item) }}>{item?.title == "Video Article" ? "Video Article" : "Article"}</button>
                    <div>
                      {moment(item.created_datetime).format(
                        "DD MMM YYYY"
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )) : "No Notification Found"}
          <div className="arrowDataNotification">
            {console.log(TotalPage, "TotalPage")}
            {TotalPage <= 1 ? (
              ""
            ) : (
              <Button
                onClick={() => getMoreDataNotification()}
                className="btnData"
              >
                View More
                {/* <img src={AppImages.LoadMore} alt="load-icon" /> */}
              </Button>
            )}
          </div>
        </div>

      </div>

      <Modal show={closePopup} onHide={handleClosePopup} size="xl" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex modal-main w-100">
            <div className="modal_img">
              <div className="ImageSection">
                <img src={AppImages.signup} alt="brand-logo" />
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
    // </AppComponent.MainLayout>
  );
};

export default Notification;
