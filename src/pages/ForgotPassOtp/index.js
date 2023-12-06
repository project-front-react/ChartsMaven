import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ForgotPassresendOTPService,
  forgotPasswordOTPVerificationService,
  resendOTPService,
} from "../../services/apiServices/authenticationModuleServices";
import { AppComponent } from "../../appData/appComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { setIsloading } from "../../redux/Slices/authenticationSlice";

const ForgotPassOtp = () => {
  const navigate = useNavigate();
  const emailID = useLocation().state;
  const userDetail = useSelector((state) => state.authSlice.userDetails);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [formErrors, setFormErrors] = useState();
  const [ValidDeatail, setValidDeatail] = useState("")
  const isLoading = useSelector((state)=>state.authSlice.isLoading)
  const dispatch = useDispatch();


  const handleVerifyOTP = () => {
    let data = {};
    if (emailID?.type === "email_verification") {
      data = {
        email_id: emailID?.email_id,
        otp: Number(otp.join("")),
        // type: "web",
      };
    } else if (emailID?.type === "mobile_verification") {
      data = {
        phone_no: emailID?.phone_no,
        otp: Number(otp.join("")),
        // type: "web",
      };
    }
    if (otp.every(element => element === '')) {
      setFormErrors("Please Enter Valid OTP")
    }
    else if (otp.reduce((acc, val) => acc || val.trim() === "", false)) {
      setFormErrors("Invalid OTP")
      setOtp(["", "", "", ""])
    }
    else {
      setFormErrors('')
      // let TOKEN = userDetail.token;
      dispatch(setIsloading(true))
      forgotPasswordOTPVerificationService(data)
        .then((res) => {
      dispatch(setIsloading(false))
          if (res.status === true) {
            // toast.success("OTP verified successfuly")
            // setTimeout(() => {
            navigate("/resetpassword", { state: data });
            // }, );

          }
        })
        .catch((err) => {
      dispatch(setIsloading(false))
          setOtp(["", "", "", ""])
          // alert(`${JSON.stringify(err)}`);
          setValidDeatail(err?.response?.data?.error)
        });
    }
  };

  const setMobileOTP = (newOtp) => {
    setOtp(newOtp);
  };

  const resetOTP = () => {
    // let type = "mobile_verification";
    // let type = emailID?.state
    // let TOKEN = userDetail.token;
    let data ={ }
    
    if (emailID?.type == "email_verification") {
      const key = "email_id"
      const value =emailID?.email_id
     data[key] =value
    } else if (emailID?.type !== "email_verification") {
      const key = "phone_no"
      const value =emailID?.phone_no
     data[key] =value
      // phone_no: emailID?.phone_no
    }
    ForgotPassresendOTPService(emailID && data)
      .then((resendOTPRes) => {
        toast.success("OTP SENT AGAIN");
      })
      .catch((error) => {
        toast.error("Resend OTP Failed");
      });
  };

  return (
    <>
      <AppComponent.OtpLayout
        setValidDeatail={setValidDeatail}
        ValidDeatail={ValidDeatail}
        setOtpValueChange={setMobileOTP}
        onBtnClick={handleVerifyOTP}
        handleResetOTP={resetOTP}
        btnText="SUBMIT OTP"
        title=" Email/Mobile Number"
        error={formErrors}
        otp={otp}
        setOtp={setOtp}
        isLoading={isLoading}
      />
    </>
  );
};

export default ForgotPassOtp;
