import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  categoryWiseArticle: [],
  status: "",
  modifierDetails: {},
  msg: "",
  code: 0,
};
//category wise article list
export const getCategoryWiseArticle = createAsyncThunk(
  "CategoryWiseArticleList/getCategoryWiseArticle",
  async (id) => {
    const response = await makeRequest(
      "get",
      `/article/sub-category-article-list/${id}`
    );
    return response;
  }
);

//api for tag wise article
export const getTagWiseCategoryArticle = createAsyncThunk(
  "CategoryWiseArticleList/getCategoryWiseArticle",
  async (id) => {
    const encodedTag = encodeURIComponent(id.tag);
    const response = await makeRequest(
      "get",
      `/article/sub-category-article-list/${id.id}?article_tag=${encodedTag}`
    );
    return response;
  }
);
//get article detail
export const getCategoryDetail = createAsyncThunk(
  "CategoryWiseArticleList/getCategoryWiseArticle",
  async (id) => {
    const response = await makeRequest("get", `/article/article/${id}`);
    return response;
  }
);
export const categoryWiseArticleSlice = createSlice({
  name: "CategoryWiseArticleList",
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = "";
    },
    clearState: (state) => {
      state.msg = "";
      state.code = 0;
    },
    updateCategoryWiseArticle: (state, action) => {
      state.categoryWiseArticle.data = action.payload;
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getCategoryWiseArticle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCategoryWiseArticle.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.categoryWiseArticle = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getCategoryWiseArticle.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});
export const { clearState, clearMsg, updateCategoryWiseArticle } = categoryWiseArticleSlice.actions;

export const getCategoryWiseArticleList = (state) =>
  state.CategoryWiseArticleList.categoryWiseArticle.data;

export const getCategoryWiseArticleListApiStatus = (state) =>
  state.CategoryWiseArticleList.status;

const newUpdatesSliceReducer = categoryWiseArticleSlice.reducer;
export default newUpdatesSliceReducer;
