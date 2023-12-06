import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

// const initialState =

export const CreateSubscriptionActionAPI = createAsyncThunk(
  "create-subscription",
  async (data) => {
    const response = await makeRequest(
      "post",
      `/payment/create-subscription/`,
      data
    );
    return response;
  }
);

export const SavePaymentActionAPI = createAsyncThunk(
  "save-payment",
  async ( data ) => {
    console.log(data,"dataa");
    // let { razorpay_subscription_id, razorpay_payment_id } = data;
    // let setData = {
    //   payment_id: razorpay_payment_id,
    //   subscription_id: razorpay_subscription_id,
    //   plan: plan,
    // };
    const response = await makeRequest(
      "post",
      `/payment/save-payment/`,
      data
    );
    console.log(data,"dataasss");
    return response;
  }
);

export const CheckStatusAPI = createAsyncThunk(
  "SubscriptionSlice/checkStatus",
  async () => {
    const response = await makeRequest("get", `/user/check-status/`);
    return response;
  }
);

export const SubscriptionSliceNew = createSlice({
  name: "SubscriptionSliceNew",
  initialState: {
    SubscriptionPlan: [],
    subscriptedStatus: null,
    SubscriptionID: "",
    status: "",
    msg: "",
    code: 0,
  },
  reducers: {
    clearMsg: (state) => {
      state.msg = "";
    },
    clearState: (state) => {
      state.msg = "";
      state.code = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateSubscriptionActionAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(CreateSubscriptionActionAPI.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 201) {
          state.SubscriptionID = action.payload.data.data.subscription_id;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(CreateSubscriptionActionAPI.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      })
      .addCase(CheckStatusAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(CheckStatusAPI.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.subscriptedStatus = action.payload.data.subscribe;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(CheckStatusAPI.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = SubscriptionSliceNew.actions;

const SubscriptionSliceReducerNew = SubscriptionSliceNew.reducer;
export default SubscriptionSliceReducerNew;
