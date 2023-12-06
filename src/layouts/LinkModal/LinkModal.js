import React, { useState } from "react";
import "./LinkModal.scss";
import Modal from "react-bootstrap/Modal";
// import { AppImages } from '../../appData/appImages';
import { AppImages } from "../../appData/appImages";
import { useRef } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
const LinkModal = (props) => {
  const [copy, setCopy] = useState("Copy")
  const [color, setColor] = useState("#040e47")
  const websiteUrl = window.location.href;
  const { data } = props;
  // copy link logic
  const linkDataRef = useRef(null);

  const copyLink = () => {
    const linkDataElement = linkDataRef.current;
    if (linkDataElement) {
      const linkData = linkDataElement.textContent;
      navigator.clipboard
        .writeText(linkData)
        .then(() => {
          // toast.success("Link Copied Succesfully!");
          // props.handleClose();
          setCopy("Copied")
          setColor("gray")
          // You can add further logic or feedback here, such as displaying a success message
        })
        .catch((error) => {
          // You can handle the error case and display an error message or provide alternative behavior
        });
    }
  };

  return (
    <>
      <Modal
        show={props.showModel}
        onHide={props.handleClose}
        {...props}
        centered
      >
        <Modal.Body className="mainContainer">
          <button className="btn-data">
            <img
              src={AppImages.closeBlue}
              alt="close buttons"
              onClick={props.handleClose
              }
            />
          </button>
          <div className="modalMainContainer">
            <div className="title">Share this Article</div>
            <div className="subTitle">Share this link via</div>
            <div className="imgSection">
              <FacebookShareButton
                url={data ? data : props.url ? props.url : websiteUrl}
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>

              <TwitterShareButton
                url={data ? data : props.url ? props.url : websiteUrl}
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>

              <LinkedinShareButton
                url={data ? data : props.url ? props.url : websiteUrl}
              >
                <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>

              <RedditShareButton
                url={data ? data : props.url ? props.url : websiteUrl}
              >
                <RedditIcon size={40} round={true} />
              </RedditShareButton>

              <WhatsappShareButton
                url={data ? data : props.url ? props.url : websiteUrl}
              // title={title}
              >
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
            </div>
            <div className="subTitle">OR Copy link</div>
            <div className="LinkBox">
              <div className="linkData" ref={linkDataRef}>
                {/* {props?.url ? props?.url : websiteUrl} */}
                {data ? data : props.url ? props.url : websiteUrl}
              </div>
              <div className="btnData">
                <button onClick={copyLink} style={{backgroundColor:color}}>{copy}</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LinkModal;
