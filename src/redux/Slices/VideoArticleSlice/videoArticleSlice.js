import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  videoArticleList: [],
  videotags: [],
  singleVideoList: [],
  selectedTab:"",
  status: "",
  modifierDetails: {},
  msg: "",
  code: 0,
};

export const getVideoArticle = createAsyncThunk(
  "VideoArticle/getVideoArticle",
  async ({ tag, page_size, sort }) => {
    const encodedVideoTag = encodeURIComponent(tag && tag);
    const response = await makeRequest(
      "get",
      `/article/video-article-list/?page_size=${page_size}&page_index=1${encodedVideoTag !== "undefined" ? `&tag_name=${encodedVideoTag}` : ""
      }${sort !== undefined ? `&sort=${sort}` : ""}`
    );
    return response;
  }
);

export const getVideoArticleDetailed = createAsyncThunk(
  "VideoArticle/getVideoArticleDetailed",
  async (uuid) => {
    const response = await makeRequest("get", `/article/video-article/${uuid}`);
    return response;
  }
);

export const videoArticleSlice = createSlice({
  name: "videoArticleData",
  initialState,

  reducers: {
    clearMsg: (state) => {
      state.msg = "";
    },
    clearState: (state) => {
      state.msg = "";
      state.code = 0;
    },
    saveSelectedTab: (state,action) => {
      state.selectedTab = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getVideoArticle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getVideoArticle.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.videoArticleList = action.payload.data;
          state.videotags = action.payload.data.video_tag;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getVideoArticle.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });

    // detailed video handling
    builder
      .addCase(getVideoArticleDetailed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getVideoArticleDetailed.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.singleVideoList = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getVideoArticleDetailed.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});
// export const { getVideoArticle, getSingleVideoArticle } = videoArticle.actions;

export const { clearState, clearMsg, saveSelectedTab } = videoArticleSlice.actions;

export const getVideoArticleList = (state) =>
  state.videoArticleData.videoArticleList.data;

export const getVideoArticleApiStatus = (state) =>
  state.videoArticleData.status;

const videoArticleReducer = videoArticleSlice.reducer;
export default videoArticleReducer;
