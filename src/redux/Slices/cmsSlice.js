import { createSlice } from "@reduxjs/toolkit";

const homePageCms = createSlice({
  name: "pageData",
  initialState: {
    homePageCMSData: [],
  },
  reducers: {
    getCMSPageDataAPICall: (state, action) => {
      state.homePageCMSData = action.payload;
    },
  },
});

export const { getCMSPageDataAPICall } = homePageCms.actions;

export default homePageCms.reducer;
