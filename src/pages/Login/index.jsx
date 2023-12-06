import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.scss";
import { AppComponent } from "../../appData/appComponent";
import Input from "../../components/FormControls/Input";
import { logInService } from "../../services/apiServices/authenticationModuleServices";
import { useDispatch, useSelector } from "react-redux";
import { LoginValidation } from "../../utils/Validation";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import localStorage from "redux-persist/es/storage";
import { setIsloading, setLoader } from "../../redux/Slices/authenticationSlice";
import Loader from "../../components/Loader";
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const [userNameError, setUserNameError] = useState("");
  const isLoading = useSelector((state) => state.authSlice.isLoading)
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [ValidDeatail, setValidDeatail] = useState("");
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.authSlice.userDetails);
  const handelchange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: LoginValidation(name, value) });
    setValidDeatail();
  };

  const handelShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const FireBaseToken = window.localStorage.getItem("firebaseToken");

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
    } else {
      let loginPayload = {
        user_name: formData.username,
        // nothing
        password: formData.password,
        device_token: FireBaseToken !== null ? FireBaseToken : "JAP@BACKEND",
      };
      // setIsLoading(true)
      // console.log(isLoading, "isloading");
      dispatch(setIsloading(true))
      logInService(loginPayload, dispatch)
        .then((loginRes) => {
          dispatch(setIsloading(false))
          console.log(isLoading, "isloadingin");
          if (loginRes.status == true) {
            console.log(loginRes, "loginres");
            localStorage.setItem("token", loginRes?.data?.token);
            localStorage.setItem(
              "userDetails",
              JSON.stringify(loginRes?.data?.user)
            );
            localStorage.setItem("mobile_verified", loginRes.data.user.mobile_verified);
            localStorage.setItem("email_verified", loginRes.data.user.email_verified);
            if (loginRes.data.user.mobile_verified == false) {
              navigate("/otpmobile");
            } else if (loginRes.data.user.email_verified == false) {
              navigate("/otpgmail");
            } else {
              navigate("/");
            }
          } else {
            console.log("else");
          }
        })
        .catch((error) => {
          dispatch(setIsloading(false))
          setValidDeatail("Incorrect Username or Password");
        });
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <AppComponent.AuthLayout>
      <div className="loginContainer">
        <h3>LOGIN</h3>
        <form>
          <div className="InputField">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handelchange}
              value={formData.username}
              error={formErrors.username}
              forUserName={userNameError}
              onKeyDownCapture={handleKeypress}
            />
            <div className="passwordContainer">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handelchange}
                error={formErrors.password}
                value={formData.password}
                onKeyDownCapture={handleKeypress}
              />
              <div
                className="passwordToggle"
                onClick={handelShowPassword}
                style={{
                  position: "absolute",
                  top: "30px",
                  fontSize: "1.5rem",
                  backgroundColor: "transparent",
                  right: "20px",
                }}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
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
            <AppComponent.Button

              text={isLoading ? "" : "LOGIN"}
              type="submit"
              onClick={handleSubmit}
            // disabled= {ValidDeatail === "" ? true : false}
            />
          </div>
        </form>
        <div className="passwordData">
          Forgot Password?{" "}
          <Link to="/forgotpassword" className="span">
            CLICK HERE
          </Link>
        </div>
        <div className="registerData">
          Not Registered Yet?
          <Link to="/signup" className="span">
            SIGN UP
          </Link>
        </div>
      </div>
    </AppComponent.AuthLayout>
  );
};

export default Login;
