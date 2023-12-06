import React, { useEffect, useState } from "react";
import Title from "../Title";
import "./commentBoxStyle.scss";
import { AppImages } from "../../appData/appImages";
import moment from "moment/moment";
import { BASE_URL } from "../../utils/Constants";
import { useDispatch } from "react-redux";
import {
  DeleteCommentAction,
  DeleteReplyCommentAction,
  PostCommentAction,
  PostReplyCommentAction,
  getAllCommentAction,
} from "../../redux/Slices/CommentSlice/commentSlice";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { getUserDetail } from "../../redux/Slices/getUserDetail/getUserDetail";
import { useReducer } from "react";
import { useRef } from "react";
import {WiTime4} from "react-icons/wi"
import { MdCalendarMonth } from "react-icons/md"

const CommentBox = ({ data, uuid }) => {
  let uuidOfVideoArticle = uuid;
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [showModal, setShowModal] = useState({});
  // const [text, setText] = useState("");
  const [UserData, setUserData] = useState([]);
  const [error, setError] = useState(false)
  const textareaRef = useRef(null);
  const replyTextareaRef = useRef(null);



  // const UserData = useSelector((state) => state?.authSlice?.userDetails);


  // get user data from localstorage
  // const UserData = JSON.parse(window?.localStorage?.getItem("userDetails"));

  const handleModalOpen = ({ id, type }) => {

    setShowModal({ ...showModal, value: id, status: true, type: type });
  };

  // alert("sdata changed");
  let count = data?.length;
  const dispatch = useDispatch();

  const spaceRegex = /^\S.*[a-zA-Z\s]*$/

  const HandleCommentAPI = () => {

    if (comment.length <= 0 || error === true) {
      console.log("type here to comment");
      toast.error("Type Something to Add Comment")
    } else {
      dispatch(PostCommentAction({ commentVal: comment, uuid: uuid })).then(
        (result) => {
          if (result.payload.status === 200) {
            setComment("");
            toast.success(result.payload.data.data);
            dispatch(getAllCommentAction(uuid));

          } else {
            toast.error(result.payload.error);
          }
        }
      );
    }
  };

  // get id from modal & handle api
  const getID = (id) => {

    const { type } = showModal;

    if (type === "comment") {
      dispatch(DeleteCommentAction(id)).then((result) => {
        if (result.payload.status === 200) {
          toast.success("Comment Deleted Succesfully!");
          dispatch(getAllCommentAction(uuid));
          setShowModal({ status: false });
        } else {
          toast.error(result.payload.error);
          setShowModal({ status: false });
        }
      });
    } else {
      dispatch(DeleteReplyCommentAction(id)).then((result) => {
        if (result.payload.status === 200) {
          toast.success("Comment Deleted Succesfully!");
          dispatch(getAllCommentAction(uuid));
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
      dispatch(PostReplyCommentAction({ commentVal: comment, uuid: uuid })).then(
        (result) => {
          if (result.payload.status === 200) {
            toast.success("Comment Added Succesfully!");
            setReply({ comment: "" });
            dispatch(getAllCommentAction(uuidOfVideoArticle));
          } else {
            toast.error(result.payload.error);
          }
        }
      );
    }
  };

  //HITTING ENTER SUBMIT
  const handleKeypress = (e) => {
    const isMobileDevice = window.innerWidth <= 768;
    console.log(isMobileDevice, "isMobileDeviceisMobileDevice");
    const isShiftPressed = e.shiftKey;
    const isEnterPressed = e.key === 'Enter';

    if (isMobileDevice && isEnterPressed) {
      e.preventDefault();
      setComment((prevText) => prevText + '\n');
    } else if (!isMobileDevice && isShiftPressed && isEnterPressed) {
      e.preventDefault();
      setComment((prevText) => prevText + '\n');
    }
    else if (!isMobileDevice && isEnterPressed) {
      e.preventDefault();
      HandleCommentAPI();
    }
  };
  const handleKeypressCommentReply = (e) => {
    const isMobileDevice = window.innerWidth <= 768;
    console.log(isMobileDevice, "isMobileDeviceisMobileDevice");
    const isShiftPressed = e.shiftKey;
    const isEnterPressed = e.key === 'Enter';

    if (isMobileDevice && isEnterPressed) {
      e.preventDefault();
      setReply({
        ...reply,
        comment: e.target.value + '\n',
      })
    } else if (!isMobileDevice && isShiftPressed && isEnterPressed) {
      e.preventDefault();
      setReply({
        ...reply,
        comment: e.target.value + '\n',
      })
    }
    else if (!isMobileDevice && isEnterPressed) {
      e.preventDefault();
      handleReplyCommentAPI();
    }

  };

  console.log(reply, "reply data");
  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter' && event.ctrlKey) {
  //     // Ctrl+Enter combination was pressed
  //     setReply(inputValue + '\n'); // Add a line break to the input value
  //   }
  // };
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
        console.log(scrollHeight,clientHeight, "comment");
      }
    };
      scrollToBottom();
  },[comment])

  useEffect(() => {
    const scrollToBottom = () => {
       if (replyTextareaRef.current) {
        const { scrollHeight, clientHeight } = replyTextareaRef.current;
        replyTextareaRef.current.scrollTop = scrollHeight - clientHeight;
        console.log(scrollHeight,clientHeight, "reply");
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

      <div className="comments-area" id="commentArea">
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
          <div className="comment-box" id="section-1">
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
                <img src={AppImages.arrow} id="imgPre" />
              </button>
            </div>
          </div>
        </div>
        {data?.map((item, index) => {

          return (
            <div className="old-comments" >
              <div className="profileCommentBox" >
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
              <div className="comments" >
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
                        <img src={AppImages.DeleteIcon} alt="delete-icon" id="imgPre" />
                      </div>
                    )}
                  </div>
                  <div className="comment">{item?.comment?.comment}</div>

                  <div className="reply-comment" >
                    {/* {item?.comment?.comment_by?.email_id ===  UserData?.email_id  && ( */}
                    {(item?.comment?.comment_by?.email_id ===
                      UserData?.email_id ||
                      UserData?.role?.user_role === "Admin") && (
                        <div className="reply-comment-box">
                          <div className="comment-box-data">
                            <textarea
                              type="de"
                              placeholder="Reply Your Comments"
                              name="comment-reply"
                              value={reply?.index === index ? reply?.comment : ""}
                              onKeyDownCapture={handleKeypressCommentReply}
                              ref={reply?.index === index ? replyTextareaRef : null}
                              // onKeyDown={handleKeyDown}
                              onChange={(e) => {
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
                              }}
                            />

                            <button
                              className="submit-comment"
                              id="submitComment"
                              onClick={() => {
                                handleReplyCommentAPI();
                              }}
                            >
                              <img src={AppImages.arrow} id="imgPre" />
                            </button>
                          </div>
                        </div>
                      )}

                    {item?.reply_comment.length >= 1 &&
                      item?.reply_comment.map((item, index) => {
                        return (
                          <div className="thread-user">
                            <div className="profileCommentBoxReply">
                              <img
                                src={
                                  item?.reply_by?.profile_image
                                    ? BASE_URL + item?.reply_by?.profile_image
                                    : AppImages.UserImage
                                }
                                alt="user"
                                id="imgPre"
                              />
                            </div>
                            <div className="user-comment w-100">
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
                                    <img src={AppImages.DeleteIcon} alt="delete-icon" id="imgPre" />
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
      </div>
    </div>
  );
};

export default CommentBox;
