import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment } from '../../../redux/Slices/PayAidPaymentSlice/PayAidPaymentSlice';

const PayaidPaymentForm = () => {
    const dispatch = useDispatch();
    const PaymentModal = useSelector((state) => state?.paymentHistory?.PaymentDetail)
    console.log(PaymentModal, "payyy");
    const [formData, setFormData] = useState({
        currency: '',
        amount: 0,
        // cardNumber: '',
        // cardHolder: '',
        // expiryDate: '',
        // billingAddress: '',
        // city: '',
        // zipCode: '',
        // country: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(makePayment(formData))
    };
    const mergedPaymentModal = PaymentModal.map(obj => obj.arrayProperty).flat();
    console.log(mergedPaymentModal, "paiiddd");

    return (
        <form onSubmit={handleSubmit}>
            {/* <label>
                Card Number:
                <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                />
            </label> */}
            {/* 
            <label>
                Card Holder:
                <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    placeholder="Card Holder Name"
                />
            </label> */}
            {/* 
            <label>
                Expiry Date:
                <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                />
            </label> */}
            <label>
                Currency
                <input
                    type="text"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    placeholder="Currency"
                />
            </label>

            <label>
                Amount:
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />
            </label>
            {/* 
            <label>
                Billing Address:
                <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    placeholder="Billing Address"
                />
            </label> */}
            {/* 
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                />
            </label> */}
            {/* 
            <label>
                Zip Code:
                <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                />
            </label> */}

            {/* <label>
                Country:
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                />
            </label> */}

            <button type="submit">Pay Now</button>
            {/* {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {paymentResult && <p>Payment Successful! Transaction ID: {paymentResult.transactionId}</p>} */}
        </form>
    );
};

export default PayaidPaymentForm;
