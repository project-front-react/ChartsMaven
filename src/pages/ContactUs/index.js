import React from "react";
import { AppComponent } from "../../appData/appComponent";
import "./contactUs.scss";
import "../pageStyles.scss";
import Title from "../../components/Title";
import { Button, Col, Row } from "react-bootstrap";
import { AppImages } from "../../appData/appImages";
import Input, { TextArea } from "../../components/FormControls/Input";
import CustomButton from "../../components/Controls/Buttons";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactUsDetail, postContactUsDetail } from "../../redux/Slices/ContactUsSlice/ContactUsSlice";
import ModalMain from "../../layouts/Modal";
import { scrollToTop } from "../../components/ScrollToTop/ScrollToTop";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ContactUs = (props) => {
  const { pageTitle } = props;
  const dispatch = useDispatch();
  const [registerDone, setRegisterDone] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email_id: "",
    message: "",
  });
  const [error, setError] = useState({
    full_name: "",
    email_id: "",
    message: "",
  });
  useEffect(() => {
    scrollToTop()
  }, [])
  const validate = (name, value) => {
    switch (name) {
      case "full_name":
        if (!value.trim()) {
          return "Full name is required";
        } else {
          return "";
        }
      case "email_id":
        if (!value) {
          return "Email is Required";
        } else if (!value.match(emailRegex)) {
          return "Enter a valid email address";
        } else {
          return "";
        }
      case "message":
        if (!value.trim()) {
          return "Messgae is Required";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };
  const handleChange = (e) => {
    setError({
      ...error,
      [e.target.name]: validate(e.target.name, e.target.value),
    });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const ClearForm = () => {
    setFormData({
      full_name: "",
      email_id: "",
      message: "",
    });
    setError({
      full_name: "",
      email_id: "",
      message: "",
    });
  }
  const ContactDetail = useSelector((state) => state.DetailForContact.ContactUsDetail.data?.content_section_1)

  const handleSubmit = async () => {
    let validationErrors = {};
    Object.keys(formData).forEach((name) => {
      const error = validate(name, formData[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    try {
    } catch (error) {
    }
    dispatch(postContactUsDetail(formData)).then(() => {
      ClearForm()
      setRegisterDone(true)
      dispatch(getContactUsDetail())
    })
  };
  useEffect(() => {
    dispatch(getContactUsDetail())
  }, [])

  return (
    <AppComponent.MainLayout header pageTitle={pageTitle}>
      <div className="contact-page inner-page">
        <Title title={ContactDetail?.heading} underline />
        <Row className="contact-section">
          <Col xs={12} md={5} lg={5} className="colContact" style={{ marginLeft: 'unset' }}>
            <div className="contact-details">
              <div className="contact-list">
                <div className="icon">
                  <img src={AppImages.LocationPin} alt="contact-icon" id="imgPre"/>
                </div>
                <div className="contact-info">
                  <h5>Address</h5>
                  <p>
                    {ContactDetail?.address}
                  </p>
                </div>
              </div>
              <div className="contact-list">
                <div className="icon">
                  <img src={AppImages.PhoneIcon} alt="contact-icon" id="imgPre"/>
                </div>
                <div className="contact-info">
                  <h5>Phone Number</h5>
                  <p>{ContactDetail?.phone_number}</p>
                </div>
              </div>
              <div className="contact-list">
                <div className="icon">
                  <img src={AppImages.EmailIcon} alt="contact-icon" id="imgPre"/>
                </div>
                <div className="contact-info">
                  <h5>Email ID</h5>
                  <p>{ContactDetail?.email_id
                  }</p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={7} lg={7}>
            <div className="contact-form">
              <form>
                <Input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  value={formData.full_name}
                  error={error.full_name}
                />
                <Input
                  type="email"
                  name="email_id"
                  placeholder="Email ID"
                  onChange={handleChange}
                  value={formData.email_id}
                  error={error.email_id}
                />
                <TextArea
                  name="message"
                  placeholder="Type Your Message"
                  onChange={handleChange}
                  value={formData.message}
                  error={error.message}
                />
                <div className="submit-wrapper">
                  <div className="submit_message">
                    <Button onClick={handleSubmit}> SEND</Button>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
        <ModalMain
          showModel={registerDone}
          onClick={() => {
            setRegisterDone(false);
          }}
          size={"md"}
          title="Thank you for connecting with us!"
          src={AppImages.correct}
        />
      </div>
    </AppComponent.MainLayout>
  );
};

export default ContactUs;
