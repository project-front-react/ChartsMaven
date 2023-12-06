import { axiosInstance } from "../../network/apis";
export const getHomePageContent = async () => {
  const myPromise = new Promise((resolve, reject) => {
    axiosInstance
      .get("cms/home-page-web/")
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return myPromise;
};
