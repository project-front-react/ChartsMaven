import React from "react";
import "./OtpInput.scss";

const OtpInput = ({ setValue, error, isResend,otp,setOtp,handleKeypress }) => {

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      const nextInput = document.getElementById(`otpIn${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  // useEffect(() => {
  //   setOtp(["", "", "", ""]);
  // }, [isResend]);

  const inputfocus = (index, elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = index - 1;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      if (elmnt.target.value) {
        const next = index + 1;
        if (next < 4) {
          elmnt.target.form.elements[next].focus();
        }
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.keyCode === 8) {
      // backspace key
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        event.preventDefault();
        const prevInput = event.target.form.elements[index - 1];
        prevInput.focus();
      }
    } else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) ) {
      // numeric keys
      if (event.target.value) {
        const next = index + 1;
        if (next < 4) {
          event.preventDefault();
          event.target.form.elements[next].focus();
        }
      }
    } else {
      event.preventDefault(); // prevent other key presses
    }
  };

  return (
    <form>
      <div className="otpInput">
        {otp.map((value, index) => (
          <input
            id={`otpIn${index}`}
            key={index}
            name={`otp${index + 1}`}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            tabIndex={index + 1}
            maxLength="1"
            onKeyDownCapture={handleKeypress}
            onKeyUp={(e) => inputfocus(index, e)}
            style={
              value
                ? { background: "#009444", color: "#ffffff" }
                : { background: "#ffffff" }
            }
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      {error ? <span className="error">{error}</span> : ""}
    </form>
  );
};

export default OtpInput;
