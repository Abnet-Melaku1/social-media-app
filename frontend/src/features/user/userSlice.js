import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "./userService"
const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
  user: user ? user : null,
  userDatas: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
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

export const userSlice = createSlice({
  name: "user",
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
  },
})
export const { reset } = userSlice.actions
export default userSlice.reducer
