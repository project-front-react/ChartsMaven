import React from 'react'
import "./changePassword.scss"
import Input from '../../../components/FormControls/Input'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangePasswordAPI } from '../../../redux/Slices/ChangePasswordSlice/ChangePasswordSlice'
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [state, setState] = useState({
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  })

  const [validationErrors, setValidationErrors] = useState({
    currentPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    validateField(name, value)
  }
  const clearForm = () => {
    setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  const changePassStatus = useSelector((state) => state.saveChangePassword.ChangePasswordStatus)

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'currentPassword':
        if (!value) {
          error = 'Please enter the current password.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]{8,16}$/.test(value)) {
          error = 'Password should be minimum 8 characters, including at least 1 uppercase letter, 1 special character, and no spaces.';
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, currentPasswordError: error }));
        break;
      case 'newPassword':
        if (!value) {
          error = 'Please enter a new password.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]{8,16}$/.test(value)) {
          error = 'Password should be minimum 8 characters, including at least 1 uppercase letter, 1 special character, and no spaces.';
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, newPasswordError: error }));
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please enter the new password.';
        } else if (state.newPassword !== value) {
          error = 'New password and confirm password do not match.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]{8,16}$/.test(value)) {
          error = 'Password should be  minimum 8 characters, including at least 1 uppercase letter, 1 special character, and no spaces.';
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, confirmPasswordError: error }));
        break;
      default:
        break;
    }
  };
  const handleChangePassword = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(state).forEach((name) => {
      const error = validateField(name, state[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    } else {
      let data = {
        old_password: state.currentPassword,
        new_password: state.newPassword
      }
      dispatch(ChangePasswordAPI(data)).then((res) => {
        if (res?.payload?.data?.data === "Password updated succesfully") {
          setTimeout(() => {
            toast.success("Password changed successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }, 500);
          navigate("/login");
          clearForm();
          localStorage.clear()
        }

      })
        .catch((err) => {
          console.log(err, "ujhiuj")
        })
    }
  }
  useEffect(() => {
    if (changePassStatus.error === "Current password is incorrect") {
      clearForm();
      toast.error("Current password is incorrect", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (changePassStatus.data === "Password updated succesfully") {
    }
  }, [changePassStatus]);
  const handelShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handelShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handelShowCurrentPassword = (e) => {
    e.preventDefault();
    setShowCurrentPassword(!showCurrentPassword)
  }
  return (
    <>
    {/* <ToastContainer theme="colored"></ToastContainer> */}
    <div className='changePassword-container'>
      <h5>Change Password</h5>
      <form className='formData'>
        <div className='passwordContainer'>
        <Input type={showCurrentPassword ? "text" : "password"} value={state.currentPassword} onChange={handleChange} name="currentPassword" placeholder="Current Password" error={validationErrors.currentPasswordError }/>
        <button
                className="passwordToggle"
                onClick={handelShowCurrentPassword}
                style={{
                  position: "absolute",
                  top: "37px",
                  fontSize: "1.5rem",
                  backgroundColor: "transparent",
                  right: "20px",
                }}
              >
                {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              </div>
        <div className='passwordContainer'>
        <Input type={showPassword ? "text" : "password"} value={state.newPassword} onChange={handleChange} name="newPassword" placeholder="New Password" error={validationErrors.newPasswordError} />
        <button
                className="passwordToggle"
                onClick={handelShowPassword}
                style={{
                  position: "absolute",
                  top: "37px",
                  fontSize: "1.5rem",
                  backgroundColor: "transparent",
                  right: "20px",
                }}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              </div>
              <div className='passwordContainer'>
        <Input type={showConfirmPassword ? "text" : "password"} value={state.confirmPassword} onChange={handleChange} name="confirmPassword" placeholder="Confirm New Password" error={validationErrors.confirmPasswordError}/>
        <button
                className="passwordToggle"
                onClick={handelShowConfirmPassword}
                style={{
                  position: "absolute",
                  top: "37px",
                  fontSize: "1.5rem",
                  backgroundColor: "transparent",
                  right: "20px",
                }}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              </div>
        <div className='save-wrapper'>
          <Button onClick={handleChangePassword}> SAVE CHANGES</Button>
          {/* <CustomButton text="SAVE CHANGES"  /> */}
        </div>
      </form>
    </div>
    </>
  )
}

export default ChangePassword