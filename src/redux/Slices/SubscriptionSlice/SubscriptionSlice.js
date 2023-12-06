// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import makeRequest from "../../../utils/ApiHandler";

// // const initialState =

// export const CreateSubscriptionAction = createAsyncThunk(
//   "create-subscription",
//   async (data) => {
//     const response = await makeRequest(
//       "post",
//       `/payment/create-subscription/`,
//       data
//     );
//     return response;
//   }
// );

// export const SavePaymentAction = createAsyncThunk(
//   "save-payment",
//   async ({ data, plan }) => {
//     let { razorpay_subscription_id, razorpay_payment_id } = data;
//     let setData = {
//       payment_id: razorpay_payment_id,
//       subscription_id: razorpay_subscription_id,
//       plan: plan,
//     };
//     const response = await makeRequest(
//       "post",
//       `/payment/save-payment/`,
//       setData
//     );
//     return response;
//   }
// );

// export const CheckStatus = createAsyncThunk("SubscriptionSlice/checkStatus", async () => {
//   const response = await makeRequest("get", `/user/check-status/`);
//   return response;
// });

// export const SubscriptionSlice = createSlice({
//   name: "SubscriptionSlice",
//   initialState: {

//     SubscriptionPlan: [],
//     subscriptedStatus: null,
//     SubscriptionID: "",
//     status: "",
//     msg: "",
//     code: 0,

//   },
//   reducers: {
//     clearMsg: (state) => {
//       state.msg = "";
//     },
//     clearState: (state) => {
//       state.msg = "";
//       state.code = 0;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(CreateSubscriptionAction.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(CreateSubscriptionAction.fulfilled, (state, action) => {
//         state.status = "success";
//         if (action.payload.status === 201) {
//           state.SubscriptionID = action.payload.data.data.subscription_id;
//           state.code = action.payload.status;
//         } else {
//           state.msg = action.payload.msg;
//         }
//       })
//       .addCase(CreateSubscriptionAction.rejected, (state, action) => {
//         state.status = "failed";
//         state.msg = action.error.message;
//       })
//       .addCase(CheckStatus.pending, (state, action) => {
//         state.status = "loading";

//       })
//       .addCase(CheckStatus.fulfilled, (state, action) => {
//         state.status = "success";
//         if (action.payload.status === 200) {
//           state.subscriptedStatus = action.payload.data.subscribe;
//           state.code = action.payload.status;
//         } else {
//           state.msg = action.payload.msg;
//         }
//       })
//       .addCase(CheckStatus.rejected, (state, action) => {
//         state.status = "failed";
//         state.msg = action.error.message;
//       });
//   },
// });

// export const { clearState, clearMsg } = SubscriptionSlice.actions;

// const SubscriptionSliceReducer = SubscriptionSlice.reducer;
// export default SubscriptionSliceReducer;
