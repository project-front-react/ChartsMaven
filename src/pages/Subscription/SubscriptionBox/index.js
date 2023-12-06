import React from "react";
import CustomButton from "../../../components/Controls/Buttons";
import { useState } from "react";
import "../subscriptionStyles.scss";
import { AppImages } from "../../../appData/appImages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { getSubscriptionStatus } from "../../../redux/Slices/SubscriptionSlice/SubscriptionStatusSlice/SubScriptionStatusSlice";
import { TEST_KEY } from "../../../utils/Constants";
import { getSubscriptionPlan } from "../../../redux/Slices/GetSubscriptionPlanList/getSubscriptionPlanList";
import ModalMain from "../../../layouts/Modal";
import {
  CheckStatusAPI,
  SavePaymentActionAPI,
} from "../../../redux/Slices/CheckStatus/checkstatusSlice";



const SubscriptionBox = (props) => {
  // const history = useHistory();

  const { getSubScriptionID } = props;

  const subscribedstatus = useSelector(
    (state) => state?.subscriptionAllDetails?.subscriptedStatus
  );
  console.log(subscribedstatus, "drgdfgdf");
  const [subscribe, setSubscribe] = useState(false);
  const [IndexSelected, setIndexSelected] = useState("");
  const [PlanID, setPlanID] = useState("");
  const [Modal, setModal] = useState(false);
  const [IsPaymentDone, setPaymentDone] = useState(false);
  // const getSubscriptionPlans = useSelector(
  //   (state) => state?.subscription?.SubscriptionPlan
  // );
  const getSubscriptionPlans = useSelector(
    (state) => state?.subscription?.SubscriptionPlanListData
  );

  const dispatch = useDispatch();
  const SendSubScriptionID = (id, i) => {
    setSubscribe(!subscribe);
    getSubScriptionID(id);
    setPlanID(id);
  };

  useEffect(() => {
    dispatch(getSubscriptionStatus());
    dispatch(CheckStatusAPI());
  }, []);

  // useEffect(() => {

  // }, [])

  const handlePayment = (id, planID) => {
    if (id) {
      const options = {
        subscription_id: id,
        description: "Subscription",
        currency: "INR",
        key: TEST_KEY,
        upi: true,
        name: "Charts Maven",
        theme: { color: "#040E47" },
        handler: (res) => {
          if (res) {
            dispatch(SavePaymentActionAPI({ data: res, plan: planID })).then(
              (res) => {
                if (res) {
                  setPaymentDone(true);
                  setModal(true);
                  dispatch(getSubscriptionStatus());
                  dispatch(getSubscriptionPlan());
                  dispatch(CheckStatusAPI());
                }
              }
            );
          } else {
            return null;
          }
        },
      };
      const rzpay = new window.Razorpay(options);
      rzpay.open();
    }
  };
  let token = localStorage.getItem("token")
  console.log(token, "token");
  let UserId = JSON.parse(localStorage.getItem("profiledetails"))
  console.log(UserId?.uuid, "uuid");


  const DispatchPlanIDtoAPI = (id) => {
    console.log(id.uuid, "idddd");
    window.location.href = `BASE_URLpayment/payment-request/${id.uuid}/user/${UserId?.uuid}`;

    // history.push(`/payment/payment-request/?name=hello&amount=${data?.plan?.amount}`);
    // if (id) {
    //   let data = { plan_id: id };
    //   dispatch(CreateSubscriptionActionAPI(data)).then((res) => {
    //     if (res?.payload?.data?.status === true) {
    //       handlePayment(res?.payload?.data?.data?.subscription_id, id);
    //     } else {
    //       toast.error(res?.payload?.error);
    //     }
    //   });
    // } else {
    //   return null;
    // }
  };
  const closeModal = () => {
    setModal(!Modal);
  };

  return (
    <>
      {getSubscriptionPlans?.data?.map((data, i) => {
        console.log(data, "fgdfg");
        return (
          <div
            className={`subs-item ${IndexSelected === i ? "selected" : ""} ${data?.is_purchased === true
              ? "selected"
              : subscribedstatus === true
                ? "disabled"
                : ""
              }`}
          >
            <div className="sub-content">
              <div className="subs-title">
                <h6>
                  {data?.plan?.plan_title}
                </h6>
              </div>
              {data?.is_purchased == true ? (
                <div className="subs-expiry">
                  <p>
                    {data?.expiry_date ? "Plan will be expire on" : "Plan Purchased Date"}
                    <br />
                    {moment(
                      data?.expiry_date ? data?.expiry_date : data?.created_datetime
                    ).format("DD/MM/YYYY")}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="subs-price">
              <div className="subs-wrapper" id="priceOrder">
                {data?.is_purchased == true || subscribedstatus == true ? (
                  <img
                    src={AppImages.SubsCheck}
                    alt="selected-subs"
                    onClick={() => setSubscribe(!subscribe)}
                    id="imgPre"
                  />
                ) : (
                  <CustomButton
                    onClick={() => {
                      SendSubScriptionID(data?.plan?.plan_id);
                      setIndexSelected(i);
                      DispatchPlanIDtoAPI(data?.plan);
                    }}
                    text="Subscribe Now"
                    bg="#EA0A3B"
                    shadow="0px 10px 10px rgba(0, 0, 0, 0.1)"
                    textColor="#ffffff"
                  />
                )}
              </div>
              <div className="price">&#8377; {data?.plan?.amount}.00</div>
            </div>
            <ModalMain
              showModel={Modal}
              onClick={closeModal}
              size="md"
              title="PAYMENT SUCCESS"
              src={AppImages.correct}
            />
          </div>
        );
      })}
    </>
  );
};

export default SubscriptionBox;
