import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
    PaymentDetail: [],
    status: "",
    msg: "",
    code: 0,
    loading: false,
    error: null,
    paymentResult: null,
};

export const makePayment = createAsyncThunk(
    "payment/makePayment",
    async (data) => {
        const apiKey = "4cb964d4-9ef4-4a25-8f85-a2a13f43cbba";
        const salt = "f6521dbf2620a313b7e60abc214051a6f1c00373";
        data.amount = parseFloat(data.amount);
        const payload = {
            ...data,
            apiKey,
            salt,
        };
        const response = await makeRequest(
            "post",
            `http://127.0.0.1:8000/payment/test-subscription/`, payload
        );
        console.log(response, "resssss");
        return response;
    }
);
export const paymentSlice = createSlice({
    name: "payment",
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
            .addCase(makePayment.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(makePayment.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 201) {
                    console.log(action, "action");
                    state.PaymentDetail = action.payload.data.response;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(makePayment.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = paymentSlice.actions;


const paymentSliceReducer = paymentSlice.reducer;
export default paymentSliceReducer;
