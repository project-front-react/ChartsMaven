import React, { useState } from 'react';
import "./ProfileModal.scss";
import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../../appData/appImages';

const ProfileModal = (props) => {

    return (
        <>
            <Modal show={props.showModel} onHide={props.handleClose}  {...props} centered>
                <Modal.Body className='mainContainer'  >
                    <button onClick={props.onClick} className='btn-data'><img src={AppImages.closeBlue} alt="close button" id="imgPre"/></button>
                    <div className='modalMainContainer'>
                        <div className='title'>
                            Select Photo
                        </div>
                        <div className='input-Data'>
                            <input
                                id="image-upload-input"
                                type="file"
                                accept="image/*"
                            onChange={props.onchange}
                            />
                        </div>
                        <div className='btnData'>
                            <button className='btn'>
                                Submit
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProfileModal