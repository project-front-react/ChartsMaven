import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
    status: "",
    modifierDetails: {},
    msg: "",
    code: 0,
    TotalPage: 0,
    SubscriptionPlanListData: [],
};

export const getSubscriptionPlan = createAsyncThunk(
  "SubscriptionPlanList/subscription-plans",
  async () => {
    const response = await makeRequest(
      "get",
      `/payment/subscription-plans/`
    );
    return response;
  }
);

 const subScriptionPlanListSlice = createSlice({
  name: "SubscriptionPlanList",
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = "";
    },
    clearState: (state) => {
      state.msg = "";
      state.code = 0;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(getSubscriptionPlan.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getSubscriptionPlan.fulfilled, (state, action) => {
      state.status = "success";
      // if (action.payload.status === 200) {
      // alert("2000")
      state.SubscriptionPlanListData = action.payload.data;
      state.code = action.payload.status;
      // } else {
      state.msg = action.payload.msg;
      // }
    })
    .addCase(getSubscriptionPlan.rejected, (state, action) => {
      state.status = "failed";
      state.msg = action.error.message;
    });
  },
});

export const { clearState, clearMsg } = subScriptionPlanListSlice.actions;

// export const getSubscriptionPlanList = (state) => state?.SubscriptionPlanList?.SubscriptionPlanListData?.data;


const subScriptionPlanListSliceReducer = subScriptionPlanListSlice.reducer;
export default subScriptionPlanListSliceReducer;
