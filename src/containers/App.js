import React, { Suspense, useEffect } from "react";
import {
  HashRouter as Router,
} from "react-router-dom";
import Loader from "../components/Loader";
import "./App.scss";
import CustomRoutes from "../routes/Routes";
import { VapidKey, messaging, onMessageListener } from "../fireBase/firebase";
import { getToken } from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSubscriptionStatus } from "../redux/Slices/SubscriptionSlice/SubscriptionStatusSlice/SubScriptionStatusSlice";
// import { onMessageListener } from "../../public/firebase-messaging-sw";
const reqPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    //generate token
    const token = await getToken(messaging, {
      vapidKey: VapidKey,
    });
    if (token) {
      localStorage.setItem("firebaseToken", token);
    }
  } else if (permission === "denied") {
    // alert("You Denied Permissions");
  }
};

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const firebaseToken = localStorage?.getItem("firebaseToken");
  const [firebaseRender, setFirebaseRendered] = useState(false);
  useEffect(() => {
    reqPermission();
  }, []);

  // const navigate = useNavigate();
  useEffect(() => {
    // window.location.reload(true);
    // window.scrollTo(0, 0)
    if (firebaseToken) {
      onMessageListener()
        .then((payload) => {
          setFirebaseRendered(!firebaseRender);
          toast.success(
            <div>
              <p>{payload?.notification?.title}</p>
              <p>{payload?.notification?.body}</p>
            </div>
          );

          // navigate("/abc");
        })
        .catch((e) => {
        });
    }
  }, [firebaseRender]);

  useEffect(() => {
    token &&
      dispatch(getSubscriptionStatus()).then((res) => {
        localStorage.setItem(
          "SubscriptionStatus",
          res?.payload?.data?.subscribe
        );
      });
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <CustomRoutes />
      </Suspense>
      <ToastContainer />
    </Router>
  );
}

export default App;
