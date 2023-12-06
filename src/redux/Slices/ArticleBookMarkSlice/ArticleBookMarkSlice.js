import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  bookMarkedArticle: [],
  status: "",
  msg: "",
  code: 0,
};

export const getArticleBookmarkAction = createAsyncThunk(
  "ArticleBookmark/getArticleBookmarkAction",
  async (uuid) => {
    const response = await makeRequest(
      "get",
      `/article/article-bookmark/${uuid}`
    );
    return response;
  }
);

const ArticlebookmarkAPI = createSlice({
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
      .addCase(getArticleBookmarkAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getArticleBookmarkAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          //   state.categoryList = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getArticleBookmarkAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = ArticlebookmarkAPI.actions;

const ArticlebookmarkAPISliceReducer = ArticlebookmarkAPI.reducer;
export default ArticlebookmarkAPISliceReducer;
