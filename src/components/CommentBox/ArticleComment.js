import React, { useEffect, useRef, useState } from "react";
import Title from "../Title";
import "./commentBoxStyle.scss";
import { AppImages } from "../../appData/appImages";
import moment from "moment/moment";
import { BASE_URL } from "../../utils/Constants";
import { useDispatch } from "react-redux";
import {
  DeleteArticleCommentAction,
  DeleteArticleReplyCommentAction,
  PostArticleCommentAction,
  PostArticleReplyCommentAction,
  getArticleCommentAction,
} from "../../redux/Slices/CommentSlice/commentSlice";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { getUserDetail } from "../../redux/Slices/getUserDetail/getUserDetail";
import {WiTime4} from "react-icons/wi"
import { MdCalendarMonth } from "react-icons/md"


const ArticleComment = ({ data, uuid }) => {
  let uuidOfVideoArticle = uuid;
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [showModal, setShowModal] = useState({});
  const [UserData, setUserData] = useState([]);
  const [error, setError] = useState(false)
  const commentRef = useRef();
  const textareaRef = useRef(null);
  const replyTextareaRef = useRef(null);
  // get user data from localstorage
  // const UserData = JSON.parse(window?.localStorage?.getItem("userDetails"));
  const handleModalOpen = ({ id, type }) => {
    setShowModal({ ...showModal, value: id, status: true, type: type });
  };

  const spaceRegex = /^\S.*[a-zA-Z\s]*$/

  useEffect(() => {
    setReply("");
    setComment("");
  }, [data]);
  let count = data?.length;
  const dispatch = useDispatch();

  const HandleCommentAPI = () => {
    if(comment.length <= 0 || error === true){
      toast.error("type something for comment")
      console.log("type something");
    } else{
    const element = document.getElementById("section-1");
    if(element){
      element.scrollIntoView({behavior:"smooth",block:"start"})
    }
    dispatch(
      PostArticleCommentAction({ commentVal: comment, uuid: uuid })
    ).then((result) => {
      if (result.payload.status === 200) {
        setComment("");
        toast.success(result.payload.data.data);
        dispatch(getArticleCommentAction(uuid));
      } else {
        toast.error(result.payload.error);
      }
    });
  }
  };

  // get id from modal & handle api
  const getID = (id) => {
    const { type } = showModal;
    if (type === "comment") {
      dispatch(DeleteArticleCommentAction(id)).then((result) => {
        if (result.payload.status === 200) {
          toast.success("Comment Deleted Succesfully!");
          dispatch(getArticleCommentAction(uuid));
          setShowModal({ status: false });
        } else {
          toast.error(result.payload.error);
          setShowModal({ status: false });
        }
      });
    } else {
      dispatch(DeleteArticleReplyCommentAction(id)).then((result) => {
        if (result.payload.status === 200) {
          toast.success("Comment Deleted Succesfully!");
          dispatch(getArticleCommentAction(uuid));
          setShowModal({ status: false });
        } else {
          toast.error(result.payload.error);
          setShowModal({ status: false });
        }
      });
    }
  };

  // HANDLE REPLY COMMENT API
  const handleReplyCommentAPI = () => {
    if (reply.length <= 0 || error === true) {
      console.log("type here to comment");
      toast.error("Type Something to Add Comment")
    } else {
    const { uuid, comment } = reply;
    dispatch(
      PostArticleReplyCommentAction({ commentVal: comment, uuid: uuid })
    ).then((result) => {
      if (result.payload.status === 200) {
        toast.success("Comment Added Succesfully!");
        setReply({ comment: "" });
        dispatch(getArticleCommentAction(uuidOfVideoArticle));
        commentRef.current.scrollIntoView();
      } else {
        toast.error(result.payload.error);
      }
    });
  }
  };

  const handleKeypress = (e) => {
    // Check if the device is a mobile device (you can use a more accurate method if needed)
    const isMobileDevice = window.innerWidth <= 768;
    console.log(isMobileDevice , "isMobileDeviceisMobileDevice");
    // Check if the shift key is pressed
    const isShiftPressed = e.shiftKey;

    // Check if the Enter key is pressed
    const isEnterPressed = e.key === 'Enter';

    if (isMobileDevice && isEnterPressed) {
      // Handle line break for mobile devices (pressing Enter)
      e.preventDefault();
      setComment((prevText) => prevText + '\n');
    } else if (!isMobileDevice && isShiftPressed && isEnterPressed) {
      // Handle line break for non-mobile devices (pressing Shift + Enter)
      e.preventDefault();
      setComment((prevText) => prevText + '\n');
    }
    else if (!isMobileDevice  && isEnterPressed) {
      e.preventDefault();
      HandleCommentAPI();
    }
  };

  const handleKeypressCommentReply = (e) => {
    const isMobileDevice = window.innerWidth <= 768;
    console.log(isMobileDevice , "isMobileDeviceisMobileDevice");
    // Check if the shift key is pressed
    const isShiftPressed = e.shiftKey;

    // Check if the Enter key is pressed
    const isEnterPressed = e.key === 'Enter';

    if (isMobileDevice && isEnterPressed) {
      // Handle line break for mobile devices (pressing Enter)
      e.preventDefault();
      setReply({
        ...reply,
        comment: e.target.value + '\n',
      })
    } else if (!isMobileDevice && isShiftPressed && isEnterPressed) {
      // Handle line break for non-mobile devices (pressing Shift + Enter)
      e.preventDefault();
      setReply({
        ...reply,
        comment: e.target.value + '\n',
      })
    }
    else if (!isMobileDevice  && isEnterPressed) {
      e.preventDefault();
      handleReplyCommentAPI();
    }
    
  };

  useEffect(() => {
    dispatch(getUserDetail()).then((res) => {
      setUserData(res?.payload?.data?.data?.user);
    });
  }, []);

  const handelChangeComment = (e) => {
    setComment(e.target.value);
    if (!spaceRegex.test(e.target.value)) {
      setError(true)
    } else if (spaceRegex.test(e.target.value)) {
      setError(false)
    } else{
      setError(false)
    }
  }

  useEffect(() => {
    const scrollToBottom = () => {
      if (textareaRef.current) {
        const { scrollHeight, clientHeight } = textareaRef.current;
        textareaRef.current.scrollTop = scrollHeight - clientHeight;
       
      }
    };
      scrollToBottom();
  },[comment])

  useEffect(() => {
    const scrollToBottom = () => {
       if (replyTextareaRef.current) {
        const { scrollHeight, clientHeight } = replyTextareaRef.current;
        replyTextareaRef.current.scrollTop = scrollHeight - clientHeight;
      
      }
    };
      scrollToBottom();
  },[reply])
  

  return (
    <div className="comment-box-section">
      <ConfirmModal
        handleModalOpen={showModal?.status}
        handleModalClose={() => setShowModal({ status: false })}
        showModal={showModal?.status}
        title="Delete Comment"
        subTitle="Are you sure You want to Delete this comment?"
        getID={getID}
        uuid={showModal?.value}
      />
      <Title title={`Comments (${count ? count : 0})`} underline />
      <div className="comments-area" id="comments-area">
        <div className="new-comment">
          <div className="profile-wrapper">
            <img
              src={
                UserData?.profile_image
                  ? BASE_URL + UserData?.profile_image
                  : AppImages.ProfilePlaceHolder
              }
              alt="user"
              id="imgPre"
            />
          </div>
          <div className="comment-boxArticle" id="section-1">
            <div className="comment-box-data">
            <textarea
              type="text"
              placeholder="Enter Your Comments Here"
              name="comment"
              value={comment}
              required
              onChange={handelChangeComment}
              onKeyDownCapture={handleKeypress}
              ref={textareaRef}
            />
            <button
              className="submit-comment"
              onClick={() => HandleCommentAPI()}
            >
              <img src={AppImages.arrow} alt="arrow-icon" id="imgPre"/>
            </button>
            </div>
          </div>
        </div>
        {data?.map((item, index) => {
          return (
            <div className="old-comments">
              <div className="profile-wrapper">
                <img
                  src={
                    item?.comment?.comment_by?.profile_image
                      ? BASE_URL + item?.comment?.comment_by?.profile_image
                      : AppImages.ProfilePlaceHolder
                  }
                  alt="user"
                  id="imgPre"
                />
              </div>
              <div className="comments" id="CommentBox">
                <div className="user-comment">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h2 className="user-name">
                        {item?.comment?.comment_by?.user_name}
                      </h2>
                      <span className="calender">
                      <MdCalendarMonth />
                        {moment(item?.comment?.created_datetime).format(
                          "DD MMM"
                        )}
                      </span>
                      <span className="time">
                      <WiTime4 />
                        {moment(item?.comment?.created_datetime).format("LT")}
                      </span>
                    </div>
                    {UserData?.role?.user_role === "Admin" && (
                      <div
                        role="button"
                        // onClick={() => handleModalOpen(item?.comment?.uuid)}
                        onClick={() =>
                          handleModalOpen({
                            id: item?.comment?.uuid,
                            type: "comment",
                          })
                        }
                      >
                        <img src={AppImages.DeleteIcon} alt="delete-icon" id="imgPre"/>
                      </div>
                    )}
                  </div>
                  <div className="comment">{item?.comment?.comment}</div>
                  <div className="reply-comment"  >
                    {(item?.comment?.comment_by?.user_name ===
                      UserData?.user_name ||
                      UserData?.role?.user_role === "Admin") && (
                        <div className="reply-comment-box" >
                           <div className="comment-box-data">
                          <textarea
                            type="text"
                            placeholder="Reply Your Comments"
                            name="comment-reply"
                            value={reply?.index === index ? reply?.comment : ""}
                            onKeyDownCapture={handleKeypressCommentReply}
                            ref={reply?.index === index ? replyTextareaRef : null}
                            onChange={(e) =>{
                              setReply({
                                ...reply,
                                index: index,
                                comment: e.target.value,
                                uuid: item?.comment?.uuid,
                              })
                              if (!spaceRegex.test(e.target.value)) {
                                setError(true)
                              }  else if (spaceRegex.test(e.target.value)) {
                                setError(false)
                              } else{
                                setError(false)
                              }
                            }
                          }
                          />
                          <button
                            className="submit-comment"
                            onClick={() => {
                              handleReplyCommentAPI();
                            }}
                          >
                            <img src={AppImages.arrow} alt="arrow-icn" id="imgPre"/>
                          </button>
                          </div>
                        </div>
                      )}
                    {item?.reply_comment.length >= 1 &&
                      item?.reply_comment.map((item, index) => {
                        return (
                          <div className="thread-user">
                            <div className="profileCommentBoxReply" >
                              <img
                                src={
                                  item?.reply_by?.profile_image
                                    ? BASE_URL + item?.reply_by?.profile_image
                                    : AppImages.UserImage
                                }
                                alt="user"
                                className="profileArticle"
                                id="imgPre"
                              />
                            </div>
                            <div
                              className="user-comment w-100"
                              id="user-comment"
                            >
                              <div className="d-flex justify-content-between">
                                <div>
                                  <h2 className="user-name">
                                    {item?.reply_by?.user_name}
                                  </h2>
                                  <span className="calender">
                                  <MdCalendarMonth />
                                    {moment(item?.created_datetime).format(
                                      "DD MMM"
                                    )}
                                  </span>
                                  <span className="time">
                                  <WiTime4 />
                                    {moment(item?.created_datetime).format(
                                      "LT"
                                    )}
                                  </span>
                                </div>
                                {UserData?.role?.user_role === "Admin" && (
                                  <div
                                    role="button"
                                    onClick={() =>
                                      handleModalOpen({
                                        id: item?.uuid,
                                        type: "reply",
                                      })
                                    }
                                  >
                                    <img src={AppImages.DeleteIcon} alt="delete-icn" 
                                    id="imgPre"/>
                                  </div>
                                )}
                              </div>
                              <div className="comment">
                                {item?.reply_comment}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default ArticleComment;
