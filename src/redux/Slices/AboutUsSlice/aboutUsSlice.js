import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  aboutUsData: [],
  status: "",
  modifierDetails: {},
  msg: "",
  code: 0,
  TotalPage: 0,
};

export const getAboutUsDetail = createAsyncThunk(
  "AboutUs/getAboutUsDetail",
  async () => {
    const response = await makeRequest(
      "get",
      `/cms/about-us-web/`
    );
    return response;
  }
);

export const aboutUsSlice = createSlice({
  name: "AboutUs",
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
      .addCase(getAboutUsDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAboutUsDetail.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.aboutUsData = action.payload.data;
        //   state.TotalPage = action.payload.data.total_page;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getAboutUsDetail.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = aboutUsSlice.actions;

export const getAdoutUsList = (state) => state?.AboutUs?.aboutUsData?.data;

export const aboutUsListApiStatus = (state) => state.AboutUs.status;

const aboutUsSliceReducer = aboutUsSlice.reducer;
export default aboutUsSliceReducer;
