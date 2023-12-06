import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppComponent } from "../../appData/appComponent";
import {
  mobileotpService,
  resendOTPService,
} from "../../services/apiServices/authenticationModuleServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css"
import { setIsloading } from "../../redux/Slices/authenticationSlice";

const OtpMobile = () => {
  const userDetail = useSelector((state) => state.authSlice.userDetails);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [formErrors, setFormErrors] = useState();
  const [ValidDeatail, setValidDeatail] = useState("")
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.authSlice.isLoading)
  const navigation = useNavigate();
  const handleVerifyOTP = () => {
    if (otp.every(element => element === '')) {
      setFormErrors("Please Enter Valid OTP")
    }
    else if (otp.reduce((acc, val) => acc || val.trim() === "", false)) {
      setFormErrors("Invalid OTP")
      setOtp(["", "", "", ""])

    }
    else {
      setFormErrors('')

      let data = {
        otp_type: "mobile_verification",
        otp: Number(otp.join("")),
      };
      // let TOKEN = userDetail.token;
      let token = localStorage.getItem("token");
      dispatch(setIsloading(true))
      mobileotpService(data, token)
        .then((res) => {
          console.log(res, "resdata");
          dispatch(setIsloading(false))
          // toast.success("OTP verified successfull")
          if (res.status == true) {
          localStorage.setItem("mobile_verified", res.status)
            navigation("/otpgmail");
          }
        })
        .catch((err) => {
          dispatch(setIsloading(false))
          // alert(`${JSON.stringify(err)}`);
          setValidDeatail(err?.response?.data?.error)
          setOtp(["", "", "", ""]);
        });
    }
  };

  const setMobileOTP = (newOtp) => {
    setOtp(newOtp);
  };

  const resetOTP = () => {
    // alert("RESET OTP PRESS");
    let type = "mobile_verification";
    let token = localStorage.getItem("token");

    resendOTPService(type, token)
      .then((resendOTPRes) => {
        toast.success("OTP Sent Successfully")
      })
      .catch((error) => {
        toast.error("Resend OTP Failed")
      });
  };
  
  const handleKeypress = (e) =>{
   //it triggers by pressing the enter key
   if (e.keyCode === 13) {
      handleVerifyOTP(e);
    }
  }
  let OtpUrl = window.location.href
  const fragment = OtpUrl.split("#/")[1];
  return (
    <>
      <AppComponent.OtpLayout
        setValidDeatail={setValidDeatail}
        ValidDeatail={ValidDeatail}
        setOtpValueChange={setMobileOTP}
        onBtnClick={handleVerifyOTP}
        handleResetOTP={resetOTP}
        btnText="VERIFY YOUR MOBILE NUMBER"
        title=" Mobile Number"
        error={formErrors}
        otp={otp}
        setOtp={setOtp}
        handleKeypress={handleKeypress}
        navifgateUrl={fragment}
        isLoading={isLoading}
      />
    </>
  );
};

export default OtpMobile;
