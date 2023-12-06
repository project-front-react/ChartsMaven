import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
    FooterData: [],
    status: "",
    modifierDetails: {},
    msg: "",
    code: 0,
    TotalPage: 0,
};

export const getFooterLinks = createAsyncThunk(
    "FooterLinks/getFooterLinks",
    async () => {
        const response = await makeRequest(
            "get",
            `/cms/header-footer-data/`
        );
        return response;
    }
);

export const FooterLinkSlice = createSlice({
    name: "FooterLinks",
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
            .addCase(getFooterLinks.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getFooterLinks.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    state.FooterData = action.payload.data;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(getFooterLinks.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = FooterLinkSlice.actions;

const FooterSliceReducer = FooterLinkSlice.reducer;
export default FooterSliceReducer;
