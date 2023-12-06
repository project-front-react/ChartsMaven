import React, { useEffect } from "react";
import { AppComponent } from "../../appData/appComponent";
import Title from "../../components/Title";
import "../pageStyles.scss";
import "./subscriptionStyles.scss";
import SubscriptionBox from "./SubscriptionBox";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getSubscriptionPlan } from "../../redux/Slices/GetSubscriptionPlanList/getSubscriptionPlanList";


const GetSubscription = (props) => {
  const { pageTitle } = props;
  // const Razorpay = useRazorpay();
  const [PlanID, setPlanID] = useState("");
  const [IsPaymentDone, setPaymentDone] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptionPlan());
  }, []);

  const getSubscriptionID = (id) => {
    setPlanID(id);
  };
  return (
    <AppComponent.MainLayout header pageTitle={pageTitle}>
      <div className="subscription-page inner-page">
        <Title title="Choose Your Plan" underline />
        <div className="subscription-section">
          <div className="subs-listing">
            <React.Fragment>
              <SubscriptionBox
                getSubScriptionID={getSubscriptionID}
                IsPaymentDone={IsPaymentDone}
              />
            </React.Fragment>
          </div>
        </div>
      </div>
    </AppComponent.MainLayout>
  );
};

export default GetSubscription;
