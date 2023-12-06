import React from "react";
import "./otpLayout.scss";
import { AppComponent } from "../../appData/appComponent";
import OtpInput from "../../components/FormControls/OtpInput";
import { useEffect } from "react";
import { useState } from "react";
import CustomButton from "../../components/Controls/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const OtpLayout = (props) => {
  const navigate = useNavigate();
  const {
    btnText,
    onBtnClick,
    setOtpValueChange,
    handleResetOTP,
    title,
    error,
    ValidDeatail,
    setValidDeatail,
    otp,
    setOtp,
    handleKeypress,
    navifgateUrl,
    isLoading
  } = props;
  // const [otp, setOtp] = useState(["", "", "", ""]);
  // const setOTPValue = (value) => {
  //   setOtp(value);
  // };


  const [time, setTime] = useState(120); // 120 seconds = 2 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const [clearState, setClearState] = useState(false);

  // useEffect(() => {
  //   setOTPValue(otp);
  //   setOtpValueChange(otp);
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);


  // useEffect(() => {
  //   setOtp(['', '', '', '', ''])
  // }, [])

  const handleResend = () => {
    setTime(120);
    setOtp(["", "", "", ""]);
    setValidDeatail("");
    setTimerRunning(true);
    handleResetOTP();

  };
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const isResend = () => {
    setClearState(!clearState);
  };


  return (
    <AppComponent.AuthLayout passLink={navifgateUrl} >
      <div className="OtpMainComponent">
        <h3>ENTER OTP</h3>
        <div className="mainContent">
          <p>Enter OTP that you will get on Registered{title}</p>
          <div className="inputFeild">
            <OtpInput
              // setValue={(val) => setOTPValue(val)}
              error={error}
              isResend={clearState}
              otp={otp}
              setOtp={setOtp}
              handleKeypress={handleKeypress}
            />
            {ValidDeatail ? (
              <div className="errorOtp" >{ValidDeatail}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="otpEXMain">
          <div className="otpExData">
            <div className="otpExpire">
              OTP Expired in: {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </div>
            <div
              className="otpResend"
              onClick={() => {
                handleResend();
                isResend();
              }}
            >
              Resend OTP
            </div>
          </div>
        </div>

        <div className="btnData">
        {isLoading ? 
              <Spinner animation="border" role="status" style={{position:"absolute"}}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            : ""}
          <CustomButton 
          text={isLoading ? "":btnText}
          onClick={() => onBtnClick(otp)} />
        </div>
        <div className="registerData">
          <button onClick={() => navigate(-1)} className="span">
          Go Back
          </button>
        </div>
      </div>
    </AppComponent.AuthLayout>
  );
};

export default OtpLayout;
