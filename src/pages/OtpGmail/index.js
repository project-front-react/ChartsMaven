import React, { useState } from "react";
import { AppComponent } from "../../appData/appComponent";
import ModalMain from "../../layouts/Modal";
import { AppImages } from "../../appData/appImages";
import {
  gmailotpService,
  resendOTPService,
} from "../../services/apiServices/authenticationModuleServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { setIsloading } from "../../redux/Slices/authenticationSlice";

const OtpGmail = () => {
  const [registerDone, setRegisterDone] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [formErrors, setFormErrors] = useState();
  const [ValidDeatail, setValidDeatail] = useState("")
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authSlice.isLoading)
  const navigate = useNavigate();

  const handleVerifyOTP = () => {
    if (otp.every(element => element === '')) {
      setFormErrors("Please Enter Valid OTP")
    }
    else if (otp.reduce((acc, val) => acc || val.trim() === "", false)) {
      setFormErrors("Invalid OTP")
    }
    else {
      setFormErrors('')
      let data = {
        otp_type: "email_verification",
        otp: Number(otp.join("")),
        // type: "web"
      };
      // let TOKEN = userDetail.token;
      let token = localStorage.getItem("token");
      dispatch(setIsloading(true))
      gmailotpService(data, token)
        .then((emailOTPRes) => {
          console.log(emailOTPRes.status, "emailres");
          dispatch(setIsloading(false))
          if (emailOTPRes.status === true) {
            setRegisterDone(true);
            localStorage.setItem("email_verified", emailOTPRes.status)
            setTimeout(() => {
              navigate("/")
            }, 1000);
            // localStorage.removeItem("formData")
          }

        })
        .catch((error) => {
          dispatch(setIsloading(false))
          setValidDeatail(error?.response?.data?.error)
        });
    }
  };
  const resetOTP = () => {
    setOtp(["", "", "", ""])
    // alert("RESET OTP PRESS");
    let type = "email_verification";
    let TOKEN = localStorage.getItem("token");

    resendOTPService(type, TOKEN)
      .then((resendOTPRes) => {
        toast.success("OTP Sent Successfully")
      })
      .catch((error) => {
        toast.error("Resend OTP Failed");
      });
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleVerifyOTP();
    }
  };
  const setEmailOTP = (Otp) => {
    setOtp(Otp);
  };
  let OtpUrl = window.location.href
  const fragment = OtpUrl.split("#/")[1]

  return (
    <>
      <AppComponent.OtpLayout
        setValidDeatail={setValidDeatail}
        ValidDeatail={ValidDeatail}
        setOtpValueChange={setEmailOTP}
        onBtnClick={handleVerifyOTP}
        handleResetOTP={resetOTP}
        btnText="VERIFY YOUR EMAIL ID"
        title=" Email Id"
        error={formErrors}
        otp={otp}
        setOtp={setOtp}
        handleKeypress={handleKeypress}
        navifgateUrl={fragment}
        isLoading={isLoading}
      />
      {

      }
      <ModalMain
        showModel={registerDone}
        onClick={() => {
          setRegisterDone(false);
        }}
        size={"md"}
        title="REGISTERED SUCCESSFULLY"
        src={AppImages.correct}
      />
    </>
  );
};

export default OtpGmail;
