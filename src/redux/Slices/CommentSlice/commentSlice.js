import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../../utils/ApiHandler";

const initialState = {
  status: "",
  msg: "",
  code: 0,
  AllComments: [],
};

export const getAllCommentAction = createAsyncThunk(
  "comment/getAllComment",
  async (uuid) => {
    const response = await makeRequest(
      "get",
      `/article/video-article-comment/${uuid}/`
    );
    return response;
  }
);
//get comment for article detail
export const getArticleCommentAction = createAsyncThunk(
  "ArticleComment/getArticleCommentAction",
  async (uuid) => {
    console.log(uuid, "uuuu");
    const response = await makeRequest(
      "get",
      `/article/article-comment/${uuid}/`
    );
    return response;
  }
);
export const PostCommentAction = createAsyncThunk(
  "comment/postcomment",

  async ({ commentVal, uuid }) => {
    let comment = { comment: commentVal };
    const response = await makeRequest(
      "post",
      `/article/video-article-comment/${uuid}/`,
      comment
    );
    return response;
  }
);

export const PostArticleCommentAction = createAsyncThunk(
  "comment/postarticlecomment",

  async ({ commentVal, uuid }) => {
    let comment = { comment: commentVal };
    const response = await makeRequest(
      "post",
      `/article/article-comment/${uuid}/`,
      comment
    );
    return response;
  }
);
export const DeleteCommentAction = createAsyncThunk(
  "comment/deletecomment",

  async (uuid) => {
    const response = await makeRequest(
      "delete",
      `/article/video-article-comment/${uuid}/`
    );
    return response;
  }
);

export const DeleteArticleCommentAction = createAsyncThunk(
  "comment/deletearticlecomment",

  async (uuid) => {
    const response = await makeRequest(
      "delete",
      `/article/article-comment/${uuid}/`
    );
    return response;
  }
);

export const PostReplyCommentAction = createAsyncThunk(
  "comment/postreplycomment",

  async ({ commentVal, uuid }) => {
    let comment = { reply_comment: commentVal };
    const response = await makeRequest(
      "post",
      `/article/video-reply-comment/${uuid}/`,
      comment
    );
    return response;
  }
);

export const PostArticleReplyCommentAction = createAsyncThunk(
  "comment/postarticlereplycomment",

  async ({ commentVal, uuid }) => {
    let comment = { reply_comment: commentVal };
    const response = await makeRequest(
      "post",
      `/article/reply-comment/${uuid}/`,
      comment
    );
    return response;
  }
);

export const DeleteReplyCommentAction = createAsyncThunk(
  "comment/deletereplycomment",

  async (uuid) => {
    const response = await makeRequest(
      "delete",
      `/article/video-reply-comment/${uuid}/`
    );
    return response;
  }
);

export const DeleteArticleReplyCommentAction = createAsyncThunk(
  "comment/deletearticlereplycomment",

  async (uuid) => {
    const response = await makeRequest(
      "delete",
      `/article/reply-comment/${uuid}/`
    );
    return response;
  }
);
const commentAPI = createSlice({
  name: "commentAPI",
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
      .addCase(getAllCommentAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllCommentAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.AllComments = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getArticleCommentAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
    builder
      .addCase(getArticleCommentAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getArticleCommentAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.AllComments = action.payload.data;
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(getAllCommentAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });

    builder
      .addCase(PostCommentAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(PostCommentAction.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.status === 200) {
          state.code = action.payload.status;
        } else {
          state.msg = action.payload.msg;
        }
      })
      .addCase(PostCommentAction.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.error.message;
      });
  },
});

export const { clearState, clearMsg } = commentAPI.actions;

const commentAPISliceReducer = commentAPI.reducer;
export default commentAPISliceReducer;
