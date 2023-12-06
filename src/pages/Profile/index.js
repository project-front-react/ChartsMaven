import React, { useRef } from "react";
import { AppComponent } from "../../appData/appComponent";
import { AppImages } from "../../appData/appImages";
import "./profileStyle.scss";
import { ProfileTabs } from "../../appData/appData";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import Bookmarked from "./Bookmarked";
import SubscriptionHistory from "./SubscriptionHistory";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../redux/Slices/getUserDetail/getUserDetail";
import { editProfileAPI } from "../../redux/Slices/EditUserProfile/EditUserProfileSlice";
import localStorage from "redux-persist/es/storage";
import { BASE_URL } from "../../utils/Constants";
import { Button, Toast } from "react-bootstrap";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {
  const [activeItem, setActiveItem] = useState("Settings");
  const [editProfile, setEditProfile] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [coverPreviewImg, setCoverPreviewImg] = useState(null);
  const [editField, setEditField] = useState(false);
  const [upatedEmail, setUpdatedEmail] = useState("");
  const [upatedMobileNo, setUpdatedMobileNo] = useState("");
  const [upatedFullName, setUpatedFullName] = useState("");
  const [editableField, setEditablefield] = useState({});
  const [navigates, setNavigate] = useState(false);
  const [error, setError] = useState({
    full_name: "",
    email_id: "",
    phone_no: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleItemClick(component) {
    setEditProfile(false);
    setActiveItem(component);
  }

  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let mobileNoRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  console.log(coverPreviewImg, "srgdr");
  const handleLogout = (item) => {
    console.log(item, "item name");
    if (item == "Logout") {
      window.localStorage.clear()

      navigate("/login");
      // localStorage.clear();
      // toast.success("Logged out successfullyss");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  function renderComponent() {
    switch (activeItem) {
      case "SubscriptionHistory":
        return <SubscriptionHistory />;
      case "Bookmarked":
        return <Bookmarked />;
      case "Settings":
        return <Settings />;
      case "ChangePassword":
        return <ChangePassword />;
      default:
        return null;
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleChangeCover = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverPreviewImg(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setCoverPreviewImg(null);
    }
  };

  useEffect(() => {
    dispatch(getUserDetail());
  }, []);
  const UserDetail = useSelector(
    (state) => state.userProfileDetails.UserDetail.data
  );

  const handleProfileEdit = () => {
    setEditProfile(!editProfile);
    setEditField(false)
  };

  useEffect(() => {
    const formData = new FormData();
    if (profileImg) {
      formData.append("profile_image", profileImg);
    } else if (coverImg) {
      formData.append("cover_image", coverImg);
    }
    if (profileImg || coverImg) {
      dispatch(editProfileAPI(formData)).then((res) => {
        dispatch(getUserDetail())
      }
      )
    }
  }, [profileImg, coverImg, previewImage]);

  const handleProfileImg = (e) => {
    setProfileImg(e.target.files[0]);
  };
  const handleCoverImg = (e) => {
    setCoverImg(e.target.files[0]);
  };

  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };
  const [inputValue, setInputValue] = useState(UserDetail?.user?.email_id);

  const handleEditFields = () => {
    setEditField(!editField);
  };
  const handleChangeNameValue = (e) => {
    setUpatedFullName(e.target.value);
    console.log("updatedname", upatedFullName)
    if (upatedFullName.length > 25) {
      setError({ ...error, ["full_name"]: "invalid data" })
    } else {
      setError("")
    }
  };

  const handleChangeEmailValue = (e) => {
    setInputValue(UserDetail?.user?.email_id);
    setUpdatedEmail(e.target.value);
    console.log(emailRegex.test(e.target.value), "dataaaa");
    if (!emailRegex.test(e.target.value)) {
      setError({ ...error, ["email_id"]: "invalid Email Id" })
    } else {
      setError("")
    }
  };

  const handleChangeMobileNoValue = (e) => {
    setUpdatedMobileNo(e.target.value);
    if (!mobileNoRegex.test(e.target.value)) {
      setError({ ...error, ["phone_no"]: "invalid Mobile Number" })
    } else {
      setError("")
    }
  };

  let isVerified = JSON.parse(window?.localStorage?.getItem("profiledetails"));
  const handleSaveChanges = () => {
    if (error === "") {
      setEditField(!editField);
      const formData = new FormData();
      if (editField) {
        formData.append("data", JSON.stringify(editableField));
      }
      dispatch(editProfileAPI(formData)).then((res) => {
        if (res.payload.error === "User with this phone number already exists") {
          Toast.error(res.payload.error, {
            cposition: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          alert(res.payload.error);
          console.log(res.payload.error, "innn");
        }
        dispatch(getUserDetail())
          .then((res) => {
            localStorage.setItem(
              "profiledetails",
              JSON.stringify(res?.payload?.data?.data?.user)
            );
            setNavigate(true);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  useEffect(() => {
    dispatch(getUserDetail()).then((res) => {
      localStorage.setItem(
        "profiledetails",
        JSON.stringify(res?.payload?.data?.data?.user)
      );
    });
  }, []);


  console.log(UserDetail?.user?.profile_image, 'fefvefvef')
  useEffect(() => {
    if (isVerified?.mobile_verified == false) {
      navigate("/otpmobile");
    }
  }, [isVerified, navigates]);

  const handleEditableFields = (e) => {
    setEditablefield({ ...editableField, [e.target.name]: e.target.value });
  };
  console.log(previewImage, "preview");
  return (
    <AppComponent.ProfileLayout>
      <div className="header-profile">
        {console.log(coverImg, "coverImg")}
        <div
          className="cover-photo"
          style={{
            backgroundImage: coverPreviewImg
              ? `url(${coverPreviewImg})`
              : UserDetail?.user?.cover_image
                ? `url(${BASE_URL + UserDetail?.user?.cover_image})`
                : `url(${AppImages.PlaceHolderImage})`,
          }}
        >
          {editProfile && (
            <div className="edit-cover" onClick={handleClick}>
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                ref={ref}
                onChange={(e) => {
                  handleCoverImg(e);
                  handleChangeCover(e);
                }}
                hidden
              />
              <img id="OpenImgUpload" src={AppImages.EditIcon} alt="edit-icon" style={{pointerEvents:"none"}}/>
            </div>
          )}
        </div>
        <AppComponent.CusContainer>
      <ProfileSidebar handleLogout={
        handleLogout}
        handleItemClick={handleItemClick}

      activeItem={activeItem}/>

          <div className="profile-content">
            <div className="image-section">

              <div className="image-uploader">
                <label htmlFor="image-upload-inputt">
                  {previewImage ? (
                    <div className="preview-image-wrapper">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="preview-image"
                        id="imgPre"
                      />
                    </div>
                  ) : (
                    <div className="preview-image-wrapper">
                      <img
                        src={
                          UserDetail?.user?.profile_image
                            ? `${BASE_URL + UserDetail?.user?.profile_image}`
                            : AppImages.ProfilePlaceHolder
                        }
                        alt="Preview"
                        id="imgPre"
                        className="preview-image"
                      />
                    </div>
                  )}
                  {editProfile && (
                    <div className="upload-placeholder">
                      <img src={AppImages.EditIcon} alt="" id="imgPre"/>
                      <input
                        id="image-upload-inputt"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleProfileImg(e);
                          handleImageUpload(e);
                        }}
                        hidden
                      />
                    </div>
                  )}
                </label>
              </div>
              <p onClick={() => handleProfileEdit()}>
                Edit Profile
                <img src={AppImages.EditIcon} alt="edit" className="ms-2" id="imgPre"/>
              </p>
            </div>
            <div className="profile-details">
              <div className="name">
                <h5>
                  {editField ? (
                    <div className="full_namefield">
                      <input
                        type="text"
                        name="full_name"
                        defaultValue={UserDetail?.user?.full_name}
                        onChange={(e) => {
                          handleChangeNameValue(e);
                          handleEditableFields(e);
                        }}
                        maxLength={25}
                      />{" "}
                      {/* {error.full_name ? (
                        <div className="error">{error.full_name}</div>
                      ) : (
                        ""
                      )} */}
                    </div>
                  ) : (
                    <span>{UserDetail?.user?.full_name}</span>
                  )}
                </h5>{" "}
                <div className="editBtnContent">
                  {editProfile && (
                    <span onClick={handleEditFields}>
                      <img src={AppImages.EditIcon} alt="edit" id="imgPre"/>
                    </span>
                  )}
                </div>
              </div>
              <h6 >
                <img src={AppImages.EmailIcon} alt="email-icon" id="imgPre"/>
                {editField ? (
                  <div className="email_field">
                    <input
                      type="email"
                      name="email_id"
                      defaultValue={UserDetail?.user?.email_id}
                      onChange={(e) => {
                        handleChangeEmailValue(e);
                        handleEditableFields(e);
                      }}
                    />{" "}
                    {error.email_id ? (
                      <div className="error">{error.email_id}</div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <span style={{ textDecoration: "underline" }}>{UserDetail?.user?.email_id}</span>
                )}
              </h6>
              <h6 >
                <img src={AppImages.PhoneIcon} alt="phone-icon" id="imgPre"/>
                {editField ? (
                  <div className="email_field">
                    <input
                      type="number"
                      name="phone_no"
                      defaultValue={UserDetail?.user?.phone_no}
                      onChange={(e) => {
                        handleChangeMobileNoValue(e);
                        handleEditableFields(e);
                      }}
                    />{" "}
                    {error.phone_no ? (
                      <div className="error">{error.phone_no}</div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <span> {UserDetail?.user?.phone_no}</span>
                )}
              </h6>
            </div>
            {editField && (
              <div className="submit_changes">
                <Button onClick={handleSaveChanges}>Submit</Button>
              </div>
            )}
          </div>
        </AppComponent.CusContainer>
      </div>
      <AppComponent.CusContainer>
        <div className="profile_tabs">
          <div className="main-profile">
            <div className="side-panel">
              <ul className="side-nav">
                {ProfileTabs.length > 0 &&
                  ProfileTabs.map((item, i) => (
                    <li
                      className={`nav-items ${activeItem === item.component ? "active" : ""
                        }`}
                      key={i}
                      onClick={() => {
                        handleItemClick(
                          item.component == null
                            ? navigate(item.action)
                            : item.component
                        );
                        handleLogout(item.name);
                      }}
                    >
                      <span className="icon">{item.icon}</span> {item.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="tab-pane">{renderComponent()}</div>
          </div>
        </div>
      </AppComponent.CusContainer>
    </AppComponent.ProfileLayout>
  );
};

export default Profile;
