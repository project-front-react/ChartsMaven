import React from 'react'
import "./SuccessPage.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import { SavePaymentActionAPI } from '../../redux/Slices/CheckStatus/checkstatusSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);

    const description = queryParams.get('description');
    const transactionId = queryParams.get('transaction_id');
    const responseMessage = queryParams.get('response_message');
    const email = queryParams.get('email');
    const amount = queryParams.get('amount');


    console.log(description, transactionId, responseMessage, email, amount, "hiiii");
    const handleSavePayment = () => {
        dispatch(SavePaymentActionAPI({ plan_uuid: description, transacrion_id: transactionId })).then((res) => {
            console.log(res, "payment res");
            toast.success(res.payload.data.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/")
        })
    }
    return (
        <div className='payment_response_main'>
            <ToastContainer />
            <div className="wrapperAlert">
                <div className="contentAlert">
                    {responseMessage == "Transaction successful" ?
                        <div className="success alert">
                            <div className="alert-body">
                                Payment Success !
                            </div>
                        </div>
                        :
                        <div className="error alert">
                            <div className="alert-body">
                                Payment Unsuccessful !
                            </div>
                        </div>}
                    <div className="bottomHalf">
                        {responseMessage == "Transaction successful" ?
                            <div>
                                <p>{`Payment Done!, your payment for ₹${amount}  has been done...`}</p>
                                <p>{`Your transactionId is ${transactionId}`}</p>
                                <button id="alertMO" onClick={handleSavePayment}>Ok</button>
                            </div> :
                            <div>
                                <p>Your payment has been failed please try again!!</p>
                                <button id="alertMO" onClick={() => navigate("/get-subscription")}>Back</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage