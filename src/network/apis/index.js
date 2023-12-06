import axios from "axios";
import { requestHandler, successHandler, errorHandler } from "../interceptors";
import { BASE_URL } from "../../utils/Constants";

//add your BASE_URL to Constants file
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials : true,
});

// Handle request process
axiosInstance.interceptors.request.use((request) => requestHandler(request));
axiosInstance.defaults.withCredentials = true; //addded for gmail otp verification
// Handle response process
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
