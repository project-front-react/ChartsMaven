import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authenticationSlice from "./Slices/authenticationSlice";
import cmsSlice from "./Slices/cmsSlice";
import pageDataSlice from "./Slices/pageDataSlice";
import getCategorySlice from "./Slices/GetCategory/getCategorySlice";
import getVideoArticle from "./Slices/VideoArticleSlice/videoArticleSlice";
import newUpdatesSliceReducer from "./Slices/NewUpdates/newUpdatesSlice";
import categoryWiseArticleSlice from "./Slices/getCategoryWiseList/getCategoryWiseList";
import aboutUsSliceReducer from "./Slices/AboutUsSlice/aboutUsSlice";
import FAQSliceReducer from "./Slices/FAQSlice/FAQSlice";
import commentAPISliceReducer from "./Slices/CommentSlice/commentSlice";
import PrivacyPoliciesSliceReducer from "./Slices/PrivacyPolicySlice/PrivacyPolicySlice";
import ArticlebookmarkAPISliceReducer from "./Slices/ArticleBookMarkSlice/ArticleBookMarkSlice";
import bookmarkAPISliceReducer from "./Slices/BookmarkSlice/bookmarkSlice";
import SettingsSliceReducer from "./Slices/SettingsSlice/settingsSlice";
import getUserDetailReducer from "./Slices/getUserDetail/getUserDetail";
import profileEditReducer from "./Slices/EditUserProfile/EditUserProfileSlice";
import ChangePasswordSliceReducer from "./Slices/ChangePasswordSlice/ChangePasswordSlice";
import ContactUsSliceReducer from "./Slices/ContactUsSlice/ContactUsSlice";
import FooterSliceReducer from "./Slices/GetFooterLinks/GetFooterLinks";
import subScriptionPlanListSliceReducer from "./Slices/GetSubscriptionPlanList/getSubscriptionPlanList";
import SubscriptionSliceReducerNew from "./Slices/CheckStatus/checkstatusSlice";
import NotificationListSliceReducer from "./Slices/NotificationModuleSlices/notificationStatusCheckSlice/notificationStatusCheckSlice";
import getNotificationListSliceReducer from "./Slices/NotificationModuleSlices/GetNotificationListSLice/GetNotificationListSlice";
import paymentSliceReducer from "./Slices/PayAidPaymentSlice/PayAidPaymentSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  homePageCMS: cmsSlice,
  pageData: pageDataSlice,
  authSlice: authenticationSlice,
  latestUpdates: newUpdatesSliceReducer,
  categoryListData: getCategorySlice,
  videoArticleData: getVideoArticle,
  categoryWiseArticleList: categoryWiseArticleSlice,
  aboutUsDetails: aboutUsSliceReducer,
  FAQListing: FAQSliceReducer,
  comment: commentAPISliceReducer,
  PrivacyData: PrivacyPoliciesSliceReducer,
  bookmarkedArticle: ArticlebookmarkAPISliceReducer,
  bookmarkedData: bookmarkAPISliceReducer,
  settingsData: SettingsSliceReducer,
  // subscription: SubscriptionSlice,
  userProfileDetails: getUserDetailReducer,
  editProfileData: profileEditReducer,
  saveChangePassword: ChangePasswordSliceReducer,
  DetailForContact: ContactUsSliceReducer,
  FooterLinksDynamic: FooterSliceReducer,
  subscription: subScriptionPlanListSliceReducer,
  subscriptionAllDetails: SubscriptionSliceReducerNew,
  notificatonList: NotificationListSliceReducer,
  getNotificationLIst: getNotificationListSliceReducer,
  paymentHistory: paymentSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

const persistor = persistStore(store);

// persistor.purge();

export { store, persistor };
