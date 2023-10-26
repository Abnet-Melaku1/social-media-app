import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { store } from "../../app/store"

import { updateUserTimeline } from "../user/userSlice"
import { useDispatch } from "react-redux"

// Inside a function or wherever you want to dispatch the action

import postService from "./postService"
const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
  user: user ? user : null,
  postData: null,
  singlePostData: null,
  isError: false,

  commentIsSuccess: false,
  commentIsLoading: false,

  commentMessage: "",
}
// create post
export const createPost = createAsyncThunk(
  "/createpost",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await postService.createPost(postData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// create Comment
export const createComment = createAsyncThunk(
  "/createComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await postService.createComment(commentData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// get Post
export const getPost = createAsyncThunk(
  "/getPost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await postService.getPost(postId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.message = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.postData = action.payload
      })
      .addCase(createComment.pending, (state) => {
        state.commentIsLoading = true
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentIsLoading = false
        state.commentIsError = true
        state.commentMessage = action.payload
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentIsLoading = false
        state.commentIsSuccess = true
        state.postData = action.payload
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true
        state.isError = false // Reset isError
        state.isSuccess = false // Reset isSuccess
        state.message = "" // Reset message
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singlePostData = action.payload
      })
  },
})
export const { reset } = postSlice.actions
export default postSlice.reducer
