import React from 'react'
import Button from 'react-bootstrap/Button';
import './Modal.scss';
import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../../appData/appImages';

const ModalMain = (props) => {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    
    return (
        <Modal className="fade-in" show={props.showModel} onHide={props.handleClose}  {...props} centered  >
            {/* <Modal.Header closeButton  className='mainHeader'>
            </Modal.Header> */}
            <Modal.Body className='main'  >
                <button onClick={props.onClick} className='btn-data'><img src={AppImages.closeWhite} alt="close button" id="imgPre"/></button>
                <div className='registerSucMain'>
                    <div className='imgWrapper'>
                        <img src={AppImages.logo} alt='logo' id="imgPre"/>
                    </div>
                    {/* <div className='circleMain'> */}
                        <div className='regi_circle'>
                            <div className='circle'>
                                <img src={props.src} alt='img' id="imgPre"/>
                            </div>
                        </div>
                    {/* </div> */}
                    <div className='title'>
                        {props.title}
                    </div>
                    <div className='title'>
                        {props.subtitle}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalMain