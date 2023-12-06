// import React from "react";
// import { useSelector } from "react-redux";
// import { Route, Navigate } from "react-router-dom";
// import Auth from "../utils/Auth";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { lang } = useSelector((state) => state);

//   return (
//     // Show the component only when the user is logged in
//     // Otherwise, redirect the user to /signin page
//     <>
//     {/* <Route
//       {...rest}
//       render={(props) =>
//         Auth.isAuth() ? (
//           <Component {...props} />
//           ) : (
//             <Navigate to={`/login`} replace />
//             )
//           }
//           /> */}
//           </>
//   );
// };

// export default PrivateRoute;
