import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  FAQData: [],
  status: "",
  modifierDetails: {},
  msg: "",
  code: 0,
  TotalPage: 0,
};

export const getFAQDetail = createAsyncThunk(
  "FAQ/getFAQDetail",
  async () => {
    const response = await makeRequest(
      "get",
      `/cms/faqs/`
    );
    return response;
  }
);

export const FAQSlice = createSlice({
  name: "FAQ",
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
      .addCase(getFAQDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFAQDetail.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          console.log(action,"acc");
          state.FAQData = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getFAQDetail.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = FAQSlice.actions;

export const getFAQList = (state) => state?.FAQ?.FAQData?.data;

export const FAQListApiStatus = (state) => state.FAQ.status;

const FAQSliceReducer = FAQSlice.reducer;
export default FAQSliceReducer;
