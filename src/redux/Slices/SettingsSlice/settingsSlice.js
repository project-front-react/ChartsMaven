import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  status: "",
  msg: "",
  code: 0,
  TotalPage: 0,
  SettingsStatus: [],
};

export const getSettingsAction = createAsyncThunk(
  "settings/getsettingsAction",
  async () => {
    const response = await makeRequest("get", `/user/manage-user-settings/`);
    return response;
  }
);

export const PutSettingAction = createAsyncThunk(
  "settings/PutSettingAction",
  async (data) => {
    const response = await makeRequest(
      "put",
      `/user/manage-user-settings/`,
      data
    );
    return response;
  }
);
export const SettingsSlice = createSlice({
  name: "SettingsSlice",
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
      .addCase(getSettingsAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSettingsAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.SettingsStatus = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getSettingsAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = SettingsSlice.actions;
const SettingsSliceReducer = SettingsSlice.reducer;
export default SettingsSliceReducer;
