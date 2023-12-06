import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
    status: "",
    msg: "",
    code: 0,
    TotalPage: 0,
    EditProfileStatus: [],
};

export const editProfileAPI = createAsyncThunk(
    "ProfileEdit/editProfileAPI",
    async (data) => {
        const response = await makeRequest(
            "put",
            `/user/manage-user-detail/`, data, true
        );
        return response;
    }
);
export const profileEditSlice = createSlice({
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
            .addCase(editProfileAPI.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(editProfileAPI.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    state.EditProfileStatus = action.payload.data;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(editProfileAPI.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = profileEditSlice.actions;
const profileEditReducer = profileEditSlice.reducer;
export default profileEditReducer;
