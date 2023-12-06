import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as LazyComponent from "../utils/LazyLoaded";
import Loader from "../components/Loader";
import { AppRoutes } from "./appRoutes";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-bootstrap";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoute from "./PublicRoute";
// import { Helmet } from "react-helmet";

const CustomRoutes = () => {
  const pageData = useSelector((state) => state.pageData);
  const location = useLocation();
  const currentRouteName = location.pathname; //
  const UpdatedRouteName = currentRouteName.split("/")[1];
  const FinalRouteName =
    UpdatedRouteName.charAt(0).toUpperCase() + UpdatedRouteName.slice(1);

  useEffect(() => {
    document.title = `Charts Maven ${
      FinalRouteName && "|" + " " + FinalRouteName
    }`;
  }, [FinalRouteName]);
  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer />
      <Routes>
        
        <Route element={<PublicRoute/>}>
        <Route exact path={AppRoutes.LOGIN} element={<LazyComponent.Login />} />
        <Route
          exact
          path={AppRoutes.SIGNUP}
          element={<LazyComponent.Signup />}
        />
        <Route
          exact
          path={AppRoutes.OTPGMAIL}
          element={<LazyComponent.OtpGmail />}
        />
        <Route
          exact
          path={AppRoutes.OTPMOBILE}
          element={<LazyComponent.OtpMobile />}
        />
        <Route
          exact
          path={AppRoutes.FORGOTPASSWORD}
          element={<LazyComponent.ForgotPassword />}
        />
        <Route
          exact
          path={AppRoutes.FORGOTPASSWORDOTP}
          element={<LazyComponent.ForgotPassOtp />}
        />
        <Route
          exact
          path={AppRoutes.RESETPASSWORDOTP}
          element={<LazyComponent.ResetPassword />}
        />
  </Route>

          <Route
            exact
            path={AppRoutes.VIDEO_ARTICLES_DETAILED}
            element={<LazyComponent.VideoArticleDetailed />}
          />
          <Route
            exact
            path={AppRoutes.BASE_URL}
            element={<LazyComponent.Home />}
          />
          <Route
            exact
            path={AppRoutes.ABOUT}
            element={<LazyComponent.AboutUs pageTitle="About us" />}
          />
          <Route
            path={AppRoutes.CATEGORIES}
            element={<LazyComponent.CategoryListing pageTitle="Categories" />}
          />
          <Route
            path={`${AppRoutes.NEW_UPDATES}`}
            element={<LazyComponent.NewUpdates pageTitle="New Updates" />}
          />
          <Route
            path={`${AppRoutes.NEW_UPDATES_SHARE}`}
            element={<LazyComponent.NewUpdates pageTitle="New Updates" />}
          />
          <Route
            path={`${AppRoutes.CATEGORYWISELIST}`}
            element={
              <LazyComponent.SubCategoryListing
                pageTitle={pageData.category.heading}
              />
            }
          />
          <Route
            path={`${AppRoutes.CATEGORY_DETAIL}`}
            element={
              <LazyComponent.CategoryDetailed
                pageTitle={pageData.subCategory.heading}
              />
            }
          />
          <Route
            path={AppRoutes.VIDEO_ARTICLES}
            element={
              <LazyComponent.VideoArticlesListing pageTitle="Video Articles" />
            }
          />
          <Route
            path={AppRoutes.CONTACT_US}
            element={<LazyComponent.ContactUs pageTitle="Contact Us" />}
          />
          <Route
            path={`${AppRoutes.CATEGORIES}/:name`}
            element={
              <LazyComponent.SubCategoryListing
                pageTitle={pageData.category.heading}
              />
            }
          />
          <Route
            path={AppRoutes.TERMS}
            element={<LazyComponent.Terms pageTitle="Terms & Condition" />}
          />
          <Route
            path={AppRoutes.PRIVACY}
            element={<LazyComponent.PrivacyPolicy pageTitle="Privacy Policy" />}
          />


        <Route element={<PrivateRoutes />}>
          <Route
            path={AppRoutes.FAQS}
            element={<LazyComponent.FAQS pageTitle="Find Your Answers" />}
          />
          

          <Route
            path={AppRoutes.GET_SUBSCRIPTION}
            element={<LazyComponent.GetSubscription pageTitle="Subscription" />}
          />
          <Route path={AppRoutes.PROFILE} element={<LazyComponent.Profile />} />
          <Route
            path={AppRoutes.BOOKMARKEDARTICLES}
            element={<LazyComponent.BookMarkedArticleList />}
          />
          <Route path={AppRoutes.SUCCESSPAGE} element={<LazyComponent.SuccessPage />} />

          
  

          <Route
            path={AppRoutes.BOOKMARKEDARTICLES}
            element={<LazyComponent.BookMarkedArticleList />}
          />
          <Route
            path={AppRoutes.NOTIFICATION}
            element={<LazyComponent.Notification />}
          />
        </Route>
        <Route path="*" element={<LazyComponent.NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default CustomRoutes;
