import React, { useState } from 'react';
import './resetPassword.scss';
import { AppComponent } from '../../appData/appComponent';
import Input from '../../components/FormControls/Input';
import ModalMain from '../../layouts/Modal';
import { AppImages } from '../../appData/appImages';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { LoginValidation } from '../../utils/Validation';
import { resetPasswordService } from '../../services/apiServices/authenticationModuleServices';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css"
import { setIsloading } from '../../redux/Slices/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [registerDone, setRegisterDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [ValidDeatail, setValidDeatail] = useState("")
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.authSlice.isLoading)

  const emailID = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    setRegisterDone(false);
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: LoginValidation(name, value, formData.password) });
  };
  const handleFormSubmit = (e) => {
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
      setFormErrors({ ...formErrors, confirmPassword: "Password does not match" });
      return;
    }

    let data = {};
    if (emailID?.state?.email_id) {
      data = {
        email_id: emailID?.state?.email_id,
        password: formData.password,
      };
    } else if (emailID?.state?.phone_no) {
      data = {
        phone_no: emailID?.state?.phone_no,
        password: formData.password,
      };
    }
    dispatch(setIsloading(true))
    resetPasswordService(data)
      .then((res) => {
        dispatch(setIsloading(false))
        if (res.status === true) {
          setRegisterDone(true);
          setTimeout(() => {
            navigate("/login")
          }, 1000);
        }
      })
      .catch((err) => {
        dispatch(setIsloading(false))
        console.log(err, "iuiyhujkhiuhiu");
        setValidDeatail(err?.response?.data?.error);
      });
  };

  const handelShowPassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  };
  const handelShowConfirmPassword = (e) => {
    e.preventDefault()
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <AppComponent.AuthLayout>
        <div className='resetPassContainer'>
          <h3>RESET PASSWORD</h3>
          <form>
            <div className='InputField'>
              <div className="passwordContainer">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  error={formErrors.password}
                  value={formData.password}
                />
                <button className="passwordToggle" onClick={handelShowPassword} style={{
                  position: 'absolute',
                  top: '30px',
                  backgroundColor: 'transparent',
                  fontSize: '1.5rem',
                  right: '20px',
                }}>
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              <div className="passwordContainer">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  onChange={handleInputChange}
                  error={formErrors.confirmPassword}
                  value={formData.confirmPassword}
                />
                <button className="passwordToggle" onClick={handelShowConfirmPassword} style={{
                  position: 'absolute',
                  top: '30px',
                  backgroundColor: 'transparent',
                  fontSize: '1.5rem',
                  right: '20px',
                }}>
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              {ValidDeatail ? (
                <div className="errorData">{ValidDeatail}</div>
              ) : (
                ""
              )}
            </div>
            <div className='btnField'>
            {isLoading ? 
              <Spinner animation="border" role="status" style={{position:"absolute"}}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            : ""}
              <AppComponent.Button text={isLoading ? "": 'SUBMIT'} type='submit' onClick={handleFormSubmit} />
            </div>
          </form>
        </div>
        <ModalMain showModel={registerDone} onClick={handleClick} size='md' title='PASSWORD RESET SUCCESSFULLY' src={AppImages.correct} />
      </AppComponent.AuthLayout>
    </>
  );
};

export default ResetPassword;
