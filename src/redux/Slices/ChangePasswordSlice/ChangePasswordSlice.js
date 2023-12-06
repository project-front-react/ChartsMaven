import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
    status: "",
    msg: "",
    code: 0,
    TotalPage: 0,
    ChangePasswordStatus: [],
};

export const ChangePasswordAPI = createAsyncThunk(
    "ChangePassword/ChangePassword",
    async (data) => {
        const response = await makeRequest(
            "post",
            `/user/change-password/`, data
        );
        return response;
    }
);
export const ChangePasswordSlice = createSlice({
    name: "ProfileEdit",
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
            .addCase(ChangePasswordAPI.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(ChangePasswordAPI.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    state.ChangePasswordStatus = action.payload.data;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(ChangePasswordAPI.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = ChangePasswordSlice.actions;
const ChangePasswordSliceReducer = ChangePasswordSlice.reducer;
export default ChangePasswordSliceReducer;
