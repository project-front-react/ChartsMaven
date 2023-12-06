import { toast } from "react-toastify";
import { axiosInstance } from "../network/apis";
import { useNavigate } from "react-router-dom";
const makeRequest = async (methods, url, body, formdata) => {
  const token = localStorage.getItem("token");

  let config = {
    method: methods,
    url,
    headers: {
      "Content-Type": formdata ? "multipart/form-data" : "application/json",
      Authorization: token && token,
    },
    data: body,
  };
  return axiosInstance(config)
    .then((response) => {
      console.log(response,"resss");
      const data = {
        status: response?.status,
        data: response?.data,
      };

      if (data.status === 200) {
        toast.success(data.data.msg);
        return data;
      } else if (data.status === 201) {
        return data;
      }
    })
    .catch((error) => {
      console.log(error, "erorrrr");
      // toast.error(error?.response?.data?.msg)
      if (error?.response?.data?.error === "Authorization token invalid") {
        localStorage.clear();
        // navigate("/")
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
        toast.error("Session Expired! Please Login again");
      } else if (error?.response) {
        return error?.response?.data;
      } else {
        // toast.error("something went wrong!")
        return error.message;
      }
    });
};
export default makeRequest;
