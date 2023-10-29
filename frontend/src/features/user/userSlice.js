import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "./userService"
import postService from "../post/postService"

const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
  user: user ? user : null,
  userData: null,
  suggestedUser: null,
  timeLine: null,
  userDatas: null,
  isError: false,
  isSuccess: false,
  followIsLoading: false,
  followIsError: false,
  followIsSuccess: false,
  isLoading: false,
  message: "",
  likeIsError: false,
  likeIsSuccess: false,
  likeIsLoading: false,
  likeMessage: "",
  savePostIsLoading: false,
  savePostIsError: false,
  savePostIsSuccess: "", // Success status
  savePostMessage: "",
  lastSavedPostId: null,
}
// update user
export const updateUser = createAsyncThunk(
  "/updateuser",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(token)
      return await userService.updateUser(userData, token)
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
export const getUser = createAsyncThunk("/getuser", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await userService.getUser(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const getTimeline = createAsyncThunk(
  "/getTimeline",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(token)

      return await userService.getTimeline(token)
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
export const getUserPosts = createAsyncThunk(
  "/getUserPosts",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await userService.getUserPosts(userId, token)
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

export const getSuggestedUser = createAsyncThunk(
  "/getSuggestedUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await userService.getSuggestedUsers(token)
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
export const followOrUnfollow = createAsyncThunk(
  "/followOrUnfollow",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(userId, token)
      return await userService.followOrUnfollow(userId, token)
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
export const savePost = createAsyncThunk(
  "/savepost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.savePosts(postId, token)
      // You should receive a response with isSaved and a message.
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
export const likeOrRemove = createAsyncThunk(
  "/likeorremove",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.likeOrRemove(postId, token)
      // You should receive a response with isSaved and a message.
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
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
      state.savePostIsLoading = false
      state.savePostIsError = false
      state.savePostIsSuccess = ""
      state.savePostMessage = ""
    },
    resetSave: (state) => {
      state.savePostIsLoading = false
      state.savePostIsError = false
      state.savePostIsSuccess = ""
      state.savePostMessage = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.message = action.payload
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userDatas = action.payload
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.message = action.payload
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userDatas = action.payload
      })

      .addCase(getTimeline.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTimeline.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.message = action.payload
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.timeLine = action.payload
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ""
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userData = action.payload
      })
      .addCase(getSuggestedUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ""
      })
      .addCase(getSuggestedUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSuggestedUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.suggestedUser = action.payload
      })
      .addCase(followOrUnfollow.pending, (state) => {
        state.followIsLoading = true
        state.followIsError = false
        state.followIsSuccess = false
        state.message = ""
      })
      .addCase(followOrUnfollow.rejected, (state, action) => {
        state.followIsLoading = false
        state.followIsError = true
        state.message = action.payload
      })
      .addCase(followOrUnfollow.fulfilled, (state, action) => {
        state.followIsLoading = false
        state.followIsSuccess = true
        state.userDatas = action.payload.updatedUser
        state.message = action.payload.message
      })
      .addCase(savePost.pending, (state) => {
        state.savePostIsLoading = true
        state.savePostIsError = false
        state.savePostIsSuccess = false
        state.savePostMessage = ""
      })
      .addCase(savePost.rejected, (state, action) => {
        state.savePostIsLoading = false
        state.savePostIsError = true
        state.savePostMessage = action.payload
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.savePostIsLoading = false
        state.savePostIsSuccess = true
        state.userDatas = action.payload.user
        const { post, message } = action.payload

        // Use map() to create a new array of posts in which the matching post is updated
        state.timeLine = state.timeLine.map((timelinePost) => {
          if (timelinePost._id === post._id) {
            return {
              ...timelinePost,
              ...post, // Update the specific post with the new data
            }
          }
          return timelinePost
        })

        state.savePostMessage = message
        state.lastSavedPostId = post._id
      })
      .addCase(likeOrRemove.pending, (state) => {
        state.likeIsLoading = true
        state.likeIsError = false
        state.likeIsSuccess = false
        state.likeMessage = ""
      })
      .addCase(likeOrRemove.rejected, (state, action) => {
        state.likeIsLoading = false
        state.likeIsError = true
        state.likeMessage = action.payload
      })
      .addCase(likeOrRemove.fulfilled, (state, action) => {
        state.likeIsLoading = false
        state.likeIsSuccess = true

        const { post, message } = action.payload

        // Use map() to create a new array of posts in which the matching post is updated
        state.timeLine = state.timeLine.map((timelinePost) => {
          if (timelinePost._id === post._id) {
            return {
              ...timelinePost,
              ...post, // Update the specific post with the new data
            }
          }
          return timelinePost
        })

        state.likeMessage = message
      })
  },
})
export const { reset, resetSave, updateUserTimeline } = userSlice.actions
export default userSlice.reducer
