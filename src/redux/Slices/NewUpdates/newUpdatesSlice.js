import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  newUpdateList: [],
  status: "",
  modifierDetails: {},
  msg: "",
  code: 0,
  TotalPage: 0,
};

export const getNewUpdates = createAsyncThunk(
  "NewUpdates/getNewUpdates",
  async ({ page_size, sort }) => {
    const response = await makeRequest(
      "get",
      `/article/new-update-list/?page_index=1&page_size=${page_size}&sort=${sort}`
    );
    return response;
  }
);

export const newUpdatesSlice = createSlice({
  name: "NewUpdates",
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = "";
    },
    clearState: (state) => {
      state.msg = "";
      state.code = 0;
    },
    updatedNewUpdateList: (state, action) => {
      state.newUpdateList = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getNewUpdates.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getNewUpdates.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.newUpdateList = action.payload.data;
          state.TotalPage = action.payload.data.total_page;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getNewUpdates.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg, updatedNewUpdateList } = newUpdatesSlice.actions;

export const getNewUpdateList = (state) => state.NewUpdates.newUpdateList.data;

export const newUpdateListApiStatus = (state) => state.NewUpdates.status;

const newUpdatesSliceReducer = newUpdatesSlice.reducer;
export default newUpdatesSliceReducer;
