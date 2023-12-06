import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  // Your Firebase configuration values
  apiKey: "AIzaSyCBcn5lR3H6q4wbb9zl9HPgRsV7JqCfPo0",
  authDomain: "aston-dev-59f4c.firebaseapp.com",
  projectId: "aston-dev-59f4c",
  storageBucket: "aston-dev-59f4c.appspot.com",
  messagingSenderId: "665725961129",
  appId: "1:665725961129:web:483b9df9553414d376fab8",
  measurementId: "G-5NQZRF6VPQ",
};

// firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const VapidKey =
  "BOxpW-8VCHQ27n1r02Eew4E-28RTXziS8BwLm00lwpAxPNqNki5S4Ut9a7UoVziY_stm9Fzn4LQ45iRPKib18sc";
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      // reject(payload);
      resolve(payload);

      // return payload;
    });
  });
