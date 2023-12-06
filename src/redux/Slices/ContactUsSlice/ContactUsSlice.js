import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
    ContactUsDetail: [],
    status: "",
    modifierDetails: {},
    msg: "",
    code: 0,
    TotalPage: 0,
};

export const getContactUsDetail = createAsyncThunk(
    "ContactUs/getContactUsDetail",
    async () => {
        const response = await makeRequest(
            "get",
            `/cms/contact-us-cms-web/`
        );
        return response;
    }
);
export const postContactUsDetail = createAsyncThunk(
    "PostContactDeatil/postContactUsDetail",
    async (data) => {
        const response = await makeRequest(
            "post",
            `/cms/contact-us/`,data
        );
        return response;
    }
);
export const contactUsSlice = createSlice({
    name: "ContactUs",
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
        //handle getcontactus detail
        builder
            .addCase(getContactUsDetail.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getContactUsDetail.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    state.ContactUsDetail = action.payload.data;
                    //   state.TotalPage = action.payload.data.total_page;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(getContactUsDetail.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
        //handle post contactus details
        builder
            .addCase(postContactUsDetail.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(postContactUsDetail.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    state.ContactUsDetail = action.payload.data;
                    //   state.TotalPage = action.payload.data.total_page;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(postContactUsDetail.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = contactUsSlice.actions;

export const getContactUsList = (state) => state?.AboutUs?.ContactUsDetail?.data;

export const ContactUsListApiStatus = (state) => state.AboutUs.status;

const ContactUsSliceReducer = contactUsSlice.reducer;
export default ContactUsSliceReducer;
