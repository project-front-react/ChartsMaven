import React from "react";
import plans from "../../../appData/subscriptionHistory.json";
import "./subscriptionHistory.scss";
import CustomButton from "../../../components/Controls/Buttons";
import { useSelector } from "react-redux";
import moment from "moment";
const SubscriptionHistory = () => {
  const UserSubscriptionDetail = useSelector(
    (state) => state?.userProfileDetails?.UserDetail?.data?.active_plan
  );
  const subscribedstatus = useSelector(
    (state) => state?.subscriptionAllDetails?.subscriptedStatus
  );
  console.log(subscribedstatus, "fdhdfhg");
  const handleDownloadInvoice = () => {
    const pdfUrl = `https://aston-stock.testyourapp.online${UserSubscriptionDetail?.invoice_pdf}`;
    window.open(pdfUrl, "_blank");
  };
  return (
    <div className="subscription-history">
      {subscribedstatus === true ? (
        <div className="subscription-listing">
          {plans.data.length > 0 &&
            plans.data.map((val, i) => (
              <div
                className="plan-item"
                key={i}
                data-active={val.subscription_status}
              >
                <h5>{`Activated ${UserSubscriptionDetail?.plan_title}`}</h5>
                <div className="plans-content">
                  {/* {val.plan_details.length > 0 && val.plan_details.map((val, i) => ( */}
                  <div className="plan-details" key={i}>
                    <h6>Amount Paid</h6>
                    <p>{UserSubscriptionDetail?.amount}</p>
                  </div>
                  <div className="plan-details" key={i}>
                    <h6>Subscription Validity</h6>
                    <p>{UserSubscriptionDetail?.plan_title}</p>
                  </div>
                  <div className="plan-details" key={i}>
                    <h6>Invoice No.</h6>
                    <p>{UserSubscriptionDetail?.invoice_number}</p>
                  </div>
                  <div className="plan-details" key={i}>
                    <h6>
                      {UserSubscriptionDetail?.expiry_datetime ? "Plan will be expire on" : "Plan Purchased Date"}
                    </h6>
                    <p>
                      {moment(
                        UserSubscriptionDetail?.expiry_datetime
                          ? UserSubscriptionDetail?.expiry_datetime
                          : UserSubscriptionDetail?.created_datetime
                      ).format("DD MMM YYYY")}
                    </p>
                  </div>
                  {/* <div className='plan-details' key={i}>
                                <h6>Payment ID:</h6>
                                {/* <p>{UserSubscriptionDetail.value}</p> */}
                  {/* </div>  */}
                  {/* ))} */}
                  <div className="plan-details">
                    <div className="invoice-wrapper">
                      <CustomButton
                        text="Download Invoice"
                        onClick={handleDownloadInvoice}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        "NO SUBSCRIPTION PLAN IS ACTIVATED"
      )}
    </div>
  );
};

export default SubscriptionHistory;
