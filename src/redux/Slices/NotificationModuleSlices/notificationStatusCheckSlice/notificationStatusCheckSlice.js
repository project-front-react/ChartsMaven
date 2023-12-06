import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../../utils/ApiHandler";

const initialState = {
    // GetNotificationList: [],
    NotificationStatus: [],
    status: "",
    modifierDetails: {},
    msg: "",
    code: 0,
    // TotalNotificationPage: 0,
};

// export const getNotificationList = createAsyncThunk(
//     "NotificationList/getNotificationList",
//     async ({ page_size }) => {
//         const response = await makeRequest(
//             "get",
//             `/user/notification-list/?page_size=${page_size}&page_index=${1}&is_clicked=${false}`
//         );
//         return response;
//     }
// );

export const notificationStatusCheck = createAsyncThunk(
    "NotificationUpdatedList/notificationStatusCheck",
    async (id) => {
        console.log(id, "iddd");
        const response = await makeRequest(
            "get",
            `/user/notification-viewed/${id}/?is_clicked=${true}`
        );
        return response;
    }
);
export const notificationStatusCheckSlice = createSlice({
    name: "notificationStatusCheck",
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
            // .addCase(getNotificationList.pending, (state, action) => {
            //     state.status = "loading";
            // })
            // .addCase(getNotificationList.fulfilled, (state, action) => {
            //     state.status = "success";
            //     if (action.payload.status === 200) {
            //         console.log(action, "accc");
            //         state.GetNotificationList = action.payload.data;
            //         state.TotalNotificationPage = action.payload.data.total_page;
            //         state.code = action.payload.status;
            //     } else {
            //         state.msg = action.payload.msg;
            //     }
            // })
            // .addCase(getNotificationList.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.msg = action.error.message;
            // })
            .addCase(notificationStatusCheck.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(notificationStatusCheck.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload.status === 200) {
                    console.log(action, "accc");
                    state.NotificationStatus = action.payload.data;
                    state.code = action.payload.status;
                } else {
                    state.msg = action.payload.msg;
                }
            })
            .addCase(notificationStatusCheck.rejected, (state, action) => {
                state.status = "failed";
                state.msg = action.error.message;
            });
    },
});

export const { clearState, clearMsg } = notificationStatusCheckSlice.actions;

const notificationStatusCheckSliceReducer = notificationStatusCheckSlice.reducer;
export default notificationStatusCheckSliceReducer;
