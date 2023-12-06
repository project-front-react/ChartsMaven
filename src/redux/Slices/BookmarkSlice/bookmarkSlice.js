import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  status: "",
  msg: "",
  code: 0,
  bookmarkedArticles: [],
  bookmarkedVideoArticles: [],
};

export const getBookmarkAction = createAsyncThunk(
  "bookmark/getbookmark",
  async (uuid) => {
    const response = await makeRequest(
      "get",
      `/article/video-bookmark/${uuid}`
    );
    return response;
  }
);

// get some bookmarked articles in profile page bookmark section
export const getBookmarkArticleAction = createAsyncThunk(
  "bookmark/getbookmarkarticle",
  async () => {
    const response = await makeRequest(
      "get",
      `/article/article-bookmark-list/?page_size=2`
    );
    return response;
  }
);

//get all bookmarked article list
export const getAllBookmarkedArticleAction = createAsyncThunk(
  "bookmark/getbookmarkarticle",
  async () => {
    const response = await makeRequest(
      "get",
      `/article/article-bookmark-list/`
    );
    return response;
  }
);

// get some bookmarked video articles in profile page bookmark section
export const getBookmarkVideoArticleAction = createAsyncThunk(
  "bookmark/getbookmarkvideoarticle",
  async () => {
    const response = await makeRequest(
      "get",
      `/article/video-bookmark-list/?page_size=2`
    );
    return response;
  }
);
//get all bookmarked video article
export const getAllBookmarkedVideoArticleAction = createAsyncThunk(
  "bookmark/getbookmarkvideoarticle",
  async () => {
    const response = await makeRequest(
      "get",
      `/article/video-bookmark-list/`
    );
    return response;
  }
);

// get some bookmarked articles in profile page bookmark section
export const getArticleBookmarkListingAction = createAsyncThunk(
  "ArticleBookmark/getArticleBookmarkListingAction",
  async (uuid) => {
    const response = await makeRequest(
      "get",
      `/article/article-bookmark/${uuid}`
    );
    return response;
  }
);
const bookmarkAPI = createSlice({
  name: "bookmarkAPI",
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
      .addCase(getBookmarkAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookmarkAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          //   state.categoryList = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getBookmarkAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });

    // get bookmarked articles api handling
    builder
      .addCase(getBookmarkArticleAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookmarkArticleAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.bookmarkedArticles = action.payload;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getBookmarkArticleAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });

    // get video bookmarked articles api handling
    builder
      .addCase(getBookmarkVideoArticleAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookmarkVideoArticleAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.bookmarkedVideoArticles = action.payload;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getBookmarkVideoArticleAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });

    // get bookmarked articles api handling
    builder
      .addCase(getArticleBookmarkListingAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getArticleBookmarkListingAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          // state.bookmarkedVideoArticles = action.payload;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getArticleBookmarkListingAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = bookmarkAPI.actions;

const bookmarkAPISliceReducer = bookmarkAPI.reducer;
export default bookmarkAPISliceReducer;
