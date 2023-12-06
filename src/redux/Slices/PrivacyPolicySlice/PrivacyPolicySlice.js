import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  PoliciesData: [],
  status: "",
  modifierDetails: {},
  msg: "",
  code: 0,
  TotalPage: 0,
};

export const getPrivacyPolicies = createAsyncThunk(
  "PrivacyPolicies/getPrivacyPoliciesDetail",
  async () => {
    const response = await makeRequest(
      "get",
      `/cms/terms-and-condition-web/`
    );
    return response;
  }
);

export const PrivacyPoliciesSlice = createSlice({
  name: "PrivacyPolicies",
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
      .addCase(getPrivacyPolicies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPrivacyPolicies.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.PoliciesData = action.payload.data;
        //   state.TotalPage = action.payload.data.total_page;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getPrivacyPolicies.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = PrivacyPoliciesSlice.actions;

export const getPrivacyPoliciesList = (state) => state?.PrivacyPolicies?.PoliciesData?.data;

export const PrivacyPoliciesListApiStatus = (state) => state.PrivacyPolicies.status;

const PrivacyPoliciesSliceReducer = PrivacyPoliciesSlice.reducer;
export default PrivacyPoliciesSliceReducer;
