import React from "react";

export const Login = React.lazy(() => import("../pages/Login"));
export const Signup = React.lazy(() => import("../pages/Signup"));
export const OtpGmail = React.lazy(() => import("../pages/OtpGmail"));
export const OtpMobile = React.lazy(() => import("../pages/OtpMobile"));
export const ForgotPassOtp = React.lazy(() => import("../pages/ForgotPassOtp"));
export const ForgotPassword = React.lazy(() =>
  import("../pages/ForgotPassword")
);
export const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));
export const NotFound = React.lazy(() =>
  import("../components/NotFound/NotFound")
);
export const Home = React.lazy(() => import("../pages/Home"));
export const AboutUs = React.lazy(() => import("../pages/AboutUs"));
export const CategoryListing = React.lazy(() =>
  import("../pages/CategoryListing")
);
export const SubCategoryListing = React.lazy(() =>
  import("../pages/CategoryListing/SubCategoryListing")
);
export const CategoryDetailed = React.lazy(() =>
  import("../pages/CategoryListing/CategoryDetailed")
);
export const VideoArticlesListing = React.lazy(() =>
  import("../pages/VideoArticles")
);
export const PrivacyPolicy = React.lazy(() => import("../pages/Privacy"));
export const Terms = React.lazy(() => import("../pages/Terms"));
export const FAQS = React.lazy(() => import("../pages/Faqs"));
export const ContactUs = React.lazy(() => import("../pages/ContactUs"));
export const GetSubscription = React.lazy(() =>
  import("../pages/Subscription")
);
export const Profile = React.lazy(() => import("../pages/Profile"));
export const NewUpdates = React.lazy(() => import("../pages/NewUpdates"));
export const VideoArticleDetailed = React.lazy(() =>
  import("../pages/VideoArticles/VideoArticlesDetailed/VideoDetailed")
);
export const Notification = React.lazy(() => import("../components/Notification/index"));

export const BookMarkedArticleList = React.lazy(() => import("../pages/BookMarkedArticles/BookmarkedArticleList/BookMarkedArticleList"));
export const SuccessPage = React.lazy(() =>
  import("../pages/SuccessPage")
)