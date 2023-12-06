import React, { useState } from "react";
import "./ForgotPassword.scss";
import { AppComponent } from "../../appData/appComponent";
import Input from "../../components/FormControls/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { forgotPasswordService } from "../../services/apiServices/authenticationModuleServices";
import { saveForgotOTPVerificationMethod, setIsloading } from "../../redux/Slices/authenticationSlice";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Spinner } from "react-bootstrap";

const ForgotPassword = () => {
  const [input, setInput] = useState();
  const [formErrors, setFormErrors] = useState();
  const [ValidDetails, setValidDetails] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.authSlice.isLoading)

  const checkInputValue = (inputValue) => {
    // Define regular expressions for email and mobile number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    // if()
    // Check if the input value matches the email or mobile number regex
    if (emailRegex.test(inputValue)) {
      // if()
      return "email";
    } else if (mobileRegex.test(inputValue)) {
      return "mobile";
    } else {
      setFormErrors("Please Enter Registered Mobile Number/Email ID");
      return "invalid";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {};
    let payload1 = {};
     if (
      checkInputValue(input) == "email" ||
      checkInputValue(input) == "mobile"
    ) {
      if (checkInputValue(input) == "email") {
        payload = {
          email_id: input,
        };
        payload1 = {
          email_id: input,
          type:"email_verification"
        };
        dispatch(saveForgotOTPVerificationMethod("email"));
      } else if (checkInputValue(input) == "mobile") {
        payload = {
          phone_no: input,
        };
        payload1 = {
          phone_no: input,
          type:"mobile_verification"
        };
        dispatch(saveForgotOTPVerificationMethod("mobile"));
      } else {
      }
      dispatch(setIsloading(true))
      forgotPasswordService(payload)
        .then((forgotRes) => {
      dispatch(setIsloading(false))
          if (forgotRes.status == true) {
            navigate("/forgotpassword-otp",{state:payload1});
          }
        })
        .catch((error) => {
      dispatch(setIsloading(false))
          setValidDetails("Please Enter registered Mobile number/Email ID")
        });
    }

    // navigate("/forgotpassword-otp");
  };
  return (
    <AppComponent.AuthLayout>
      <form onSubmit={handleSubmit}>
        <div className="ForgotMainContainer">
          <h3>FORGOT PASSWORD</h3>
          <div className="InputField">
            <Input
              type="text"
              name="text"
              placeholder="Email Id or Mobile Number"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              error={formErrors}
            />
            {ValidDetails ? (
                <div className="errorData">{ValidDetails}</div>
              ) : (
                ""
              )}
          </div>
          <div className="btnField">
          {isLoading ? 
              <Spinner animation="border" role="status" style={{position:"absolute"}}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            : ""}
            <AppComponent.Button text={isLoading ? "": "GET OTP"} />
          </div>
          <div className="registerData">
          Go Back To 
          <button onClick={() => navigate(-1)} className="span">
            LOGIN
          </button>
        </div>
        </div>
      </form>
    </AppComponent.AuthLayout>
  );
};

export default ForgotPassword;
