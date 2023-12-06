import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = ({ message, type }) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    default:
      toast.info(message);
      break;
  }

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Toaster;
