import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
    UserDetail: [],
    status: "",
    modifierDetails: {},
    msg: "",
    code: 0,
    TotalPage: 0,
};

export const getUserDetail = createAsyncThunk(
    "UserDetail/getUserDetail",
    async () => {
        const response = await makeRequest(
            "get",
            `/user/user-profile/`
        );
        return response;
    }
);

export const getUserDetailSlice = createSlice({
    name: "UserProfileDetail",
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
            .addCase(getUserDetail.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    state.UserDetail = action.payload.data;
                    //   state.TotalPage = action.payload.data.total_page;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(getUserDetail.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = getUserDetailSlice.actions;

export const UserDetailApiStatus = (state) => state.UserDetail.status;

const getUserDetailReducer = getUserDetailSlice.reducer;
export default getUserDetailReducer;
