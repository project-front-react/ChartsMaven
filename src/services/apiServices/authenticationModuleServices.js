import { axiosInstance } from "../../network/apis";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

export const signUpService = async (data) => {
  const signUp = new Promise((resolve, reject) => {
    axiosInstance
      .post("user/register/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return signUp;
};

export const otpService = async (data, token) => {
  const otpPromise = new Promise((resolve, reject) => {
    axiosInstance
      .post("/user/forgot-password-verification/", data, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return otpPromise;
};
export const mobileotpService = async (data, token) => {
  const mobileotpPromise = new Promise((resolve, reject) => {
    axiosInstance
      .post("/user/otp-verification/", data, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return mobileotpPromise;
};
export const gmailotpService = async (data, token) => {
  const gmailotpPromise = new Promise((resolve, reject) => {
    axiosInstance
      .post("/user/otp-verification/", data, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return gmailotpPromise;
};
export const logInService = async (data) => {
  const logIn = new Promise((resolve, reject) => {
    axiosInstance
      .post("user/user-login/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error, "console.log(formData.password)");
        reject(error);
      });
  });
  return logIn;
};

export const forgotPasswordService = async (data) => {
  const forgotPass = new Promise((resolve, reject) => {
    axiosInstance
      .post("user/forgot-password/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return forgotPass;
};

export const forgotPasswordOTPVerificationService = async (data, token) => {
  const verifyForgotOTP = new Promise((resolve, reject) => {
    axiosInstance
      .post("/user/forgot-password-verification/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return verifyForgotOTP;
};

export const resetPasswordService = async (data) => {
  const resetPassPromise = new Promise((resolve, reject) => {
    axiosInstance
      .post("/user/reset-password/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return resetPassPromise;
};

export const verifyOTPService = async (data) => {
  const verifyOTP = new Promise((resolve, reject) => {
    axiosInstance
      .post("user/register/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return verifyOTP;
};

export const resendOTPService = async (type, token) => {
  const verifyOTP = new Promise((resolve, reject) => {
    axiosInstance
      .get(`user/resend-otp/?otp_type=${type}`,{
        headers: {
          Authorization: token
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return verifyOTP;
};
export const ForgotPassresendOTPService = async (data) => {
  const ForgotPassresend = new Promise((resolve, reject) => {
    axiosInstance
      .post("user/forgot-password/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return ForgotPassresend;
};
