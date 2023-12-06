// import React from "react";
// import "./LinkModal.scss";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { AppImages } from "../../appData/appImages";

// const datadata = ({ showModel, data, setShow, size }) => {
//   const handleClose = () => {
//     setShow(false);
//   };

//   // link copy function
//   const handleCopy = () => {
//     navigator.clipboard.writeText(data);
//   };

//   return (
//     <>
//       <Modal show={showModel} size={size} centered>
//         <Modal.Body className="mainContainer">
//           <button className="btn-dataaaaaaa">
//             <img
//               src={AppImages.closeBlue}
//               alt="close button"
//               onClick={() => handleClose()}
//             />
//           </button>
//           <div className="modalMainContainer">
//             <div className="title">Share this Article</div>
//             <div className="subTitle">Share this link via</div>
//             <div className="imgSection">
//               <div className="imgWrapper">
//                 <img src={AppImages.instagramLogo} alt="instagram" />
//               </div>
//               <div className="imgWrapper">
//                 <img src={AppImages.linkdinLogo} alt="linkedin" />
//               </div>
//               <div className="imgWrapper">
//                 <img src={AppImages.twitterLogo} alt="twitter" />
//               </div>
//               <div className="imgWrapper">
//                 <img src={AppImages.facebookLogo} alt="facebook" />
//               </div>
//               <div className="imgWrapper">
//                 <img src={AppImages.whatsappLogo} alt="whatsapp" />
//               </div>
//             </div>
//             <div className="subTitle">OR Copy link</div>
//             <div className="LinkBox">
//               <div className="linkData">
//                 {data}
//                 {/* {/ ChartsMaven.com/article1 /} */}
//               </div>

//               <button
//                 onClick={() => {
//                   handleCopy(data);
//                 }}
//               >
//                 Copy
//               </button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default LinkModalsCustom;
