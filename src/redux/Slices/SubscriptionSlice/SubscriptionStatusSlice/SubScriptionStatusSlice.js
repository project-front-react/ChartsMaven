import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../../utils/ApiHandler";

const initialState = {
    status: "",
    modifierDetails: {},
    msg: "",
    code: 0,
    TotalPage: 0,
    SubscriptionStatusCheck: [],
};

export const getSubscriptionStatus = createAsyncThunk(
    "SubscriptionStatus/subscription-status",
    async () => {
        const response = await makeRequest(
            "get",
            `/user/check-status/`
        );
        return response;
    }
);

const subScriptionStatusSlice = createSlice({
    name: "SubscriptionStatus",
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
            .addCase(getSubscriptionStatus.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    alert("hhh")
                    state.SubscriptionStatusCheck = action.payload.data;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(getSubscriptionStatus.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = subScriptionStatusSlice.actions;

// export const getSubscriptionPlanList = (state) => state?.SubscriptionPlanList?.SubscriptionPlanListData?.data;


const SubscriptionStatusSliceReducer = subScriptionStatusSlice.reducer;
export default SubscriptionStatusSliceReducer;
