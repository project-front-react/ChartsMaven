import React, { useState } from "react";
import "./Signup.scss";
import Input from "../../components/FormControls/Input";
import { AppComponent } from "../../appData/appComponent";
import { Link, useNavigate } from "react-router-dom";
import { signUpService } from "../../services/apiServices/authenticationModuleServices";
import { useDispatch, useSelector } from "react-redux";
import { saveUserDetails, setIsloading } from "../../redux/Slices/authenticationSlice";
import { LoginValidation } from "../../utils/Validation";
// import "react-phone-input-2/lib/style.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Spinner from 'react-bootstrap/Spinner';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect } from "react";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    mobileno: "",
    password: "",
    confirmPassword: "",
  });
  const isLoading = useSelector((state) => state.authSlice.isLoading)
  const [contryCodeLength, setContryCodeLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ValidDeatail, setValidDeatail] = useState("")

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors({
      ...formErrors,
      [name]: LoginValidation(name, value, formData.password),
    });
  };
  // useEffect(() => {
  //   // Check if stored form data exists
  //   const storedFormData = localStorage.getItem('formData');
  //   if (storedFormData) {
  //     const parsedFormData = JSON.parse(storedFormData);
  //     setFormData(parsedFormData);
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(formData).forEach((name) => {
      const error = LoginValidation(name, formData[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: "Password does not match",
      });
    } else {
      dispatch(setIsloading(true))
      let userRegistrationDetails = {
        email_id: formData.email,
        user_name: formData.username,
        phone_no: formData.mobileno.substr(contryCodeLength),
        password: formData.password,
        device_token: formData.confirmPassword,
        full_name: formData.fullname,
      };
      signUpService(userRegistrationDetails)
        .then((val) => {
          console.log(val.data, "valuedata");
          dispatch(setIsloading(false))
          if (Object.keys(val.data.user).length > 0)
            localStorage.setItem("username", val.data.user.user_name);
          localStorage.setItem("email", val.data.user.email_id);
          localStorage.setItem("mobileno", val.data.user.phone_no);
          localStorage.setItem("token", val.data.token);
          localStorage.setItem("mobile_verified", val.data.user.mobile_verified);
          localStorage.setItem("email_verified", val.data.user.email_verified);
          dispatch(
            saveUserDetails({
              userName: val.data.user.user_name,
              email: val.data.user.email_id,
              mobile: val.data.user.phone_no,
              token: val.data.token,
            })
          );
          navigate("/otpmobile");
        })
        .catch((err) => {
          dispatch(setIsloading(false))
          console.log(err);
          setValidDeatail(err?.response?.data?.error);
          // toast.error(err);
        });
    }

    localStorage.setItem("formData", JSON.stringify(formData));
    // localStorage.setItem("mobileno", val.data.user.phone_no)
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 32) {
      // 32 is the key code for the space key
      event.preventDefault(); // Prevents the space character from being entered
    }
  };

  const handleonChange = (e, data) => {
    setContryCodeLength(data.dialCode.length);
    setFormData({ ...formData, mobileno: e });
    // let { name, value } = e.target;
    setFormErrors({
      ...formErrors,
      mobileno: LoginValidation("mobileno", e.substr(data.dialCode.length)),
    });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <>
      <AppComponent.AuthLayout>
        <div className="signupContainer">
          <h3>REGISTER</h3>
          <div className="InputField">
            {/* Name  */}
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              error={formErrors.username}
              value={formData.username}
              onKeyDown={(event) => handleKeyDown(event)}
              onKeyDownCapture={handleKeypress}
            />
            {/* full name */}
            <Input
              type="text"
              name="fullname"
              placeholder="Full Name"
              onChange={handleChange}
              error={formErrors.fullname}
              value={formData.fullname}
              onKeyDownCapture={handleKeypress}
            />
            {/* Email */}
            <Input
              type="email"
              name="email"
              placeholder="Email Id"
              onChange={handleChange}
              error={formErrors.email}
              value={formData.email}
              onKeyDownCapture={handleKeypress}
            />
            <div className="inputBox">
              <PhoneInput
                type="number"
                value={formData.mobileno}
                name="mobileno"
                placeholder="Mobile Number"
                country={"in"}
                className="containerDrop"
                onChange={handleonChange}
                error={formErrors.mobileno}
                onKeyDownCapture={handleKeypress}
              />
              {formErrors.mobileno ? (
                <span className="error">{formErrors.mobileno}</span>
              ) : (
                ""
              )}
            </div>

            {/* Pass  */}
            <div className="passwordContainer">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                error={formErrors.password}
                value={formData.password}
                onKeyDownCapture={handleKeypress}
              />
              <button
                className="passwordToggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "20px",
                  backgroundColor: "transparent",
                  fontSize: "1.5rem",
                  right: "20px",
                }}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            <div className="passwordContainer">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                error={formErrors.confirmPassword}
                value={formData.confirmPassword}
                onKeyDownCapture={handleKeypress}
              />
              <button
                className="passwordToggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  top: "20px",
                  backgroundColor: "transparent",
                  fontSize: "1.5rem",
                  right: "20px",
                }}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            {ValidDeatail ? (
              <div className="errorData">{ValidDeatail}</div>
            ) : (
              ""
            )}
          </div>
          <div className="btnField">
            {isLoading ?
              <Spinner animation="border" role="status" style={{ position: "absolute" }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              : ""}
            <AppComponent.Button onClick={handleSubmit}
              text={isLoading ? "" : "REGISTER"}
            />
          </div>
          <div className="registerData">
            Already Registered?{" "}
            <Link to="/login" className="span">
              LOGIN
            </Link>
          </div>
        </div>
      </AppComponent.AuthLayout>
    </>
  );
};

export default Signup;
