import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ConfirmModal.scss";
const ConfirmModal = ({
  title,
  subTitle,
  showModal,
  handleModalClose,
  uuid,
  getID,
  getConfirmationDeleteAccount,
}) => {
  const sendIDToParent = (uuid) => {
    getID(uuid);
  };

  const sendConfirmation = (val) => {
    // getConfirmationDeleteAccount(val);
    getConfirmationDeleteAccount(val);
  };
  return (
    <>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h1 className="title-modal">{title}</h1>
          <p className="sub-title-green">{subTitle}</p>
          <div className="d-flex justify-content-center button-box">
            <button
              role="button"
              className="cancel-btn"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              role="button"
              className="delete-btn"
              onClick={() => {
                getID ? sendIDToParent(uuid) : sendConfirmation("true");
              }}
            >
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmModal;
