import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  categoryList: [],
  status: "",
  modifierDetails: {},
  msg: "",
  code: 0,
};

export const getCategoryList = createAsyncThunk(
  "categoryListData/getCategoryList",
  async ({ sort }) => {
    const response = await makeRequest("get", `/cms/category-cms-web/?sort=${sort}`);
    return response;
  }
);

const categoryList = createSlice({
  name: "categoryListData",
  initialState,
  reducers: {
    clearMsg: (state) => { state.msg = "" },
    clearState: (state) => {
      state.msg = "";
      state.code = 0;
    },
    // getAllCategory: (state, action) => {
    //   state.allCategoryData = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategoryList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.categoryList = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      })
  },
});

export const { clearState, clearMsg } = categoryList.actions;

export const getCategoryListing = (state) =>
  state.categoryListData.categoryList.data;

export const categoryListApiStatus = (state) =>
  state.categoryListData.status;

const categoryListSliceReducer = categoryList.reducer;
export default categoryListSliceReducer;

