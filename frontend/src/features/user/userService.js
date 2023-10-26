import axios from "axios"

const API_URL = `${process.env.REACT_APP_API_URL}users/`

console.log(API_URL)

const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(token)
  console.log(userData)
  const response = await axios.post(API_URL + "updateuser", userData, config)

  return response.data
}
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "getuser", config)

  return response.data
}
const getUserPosts = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}${userId}`, config)
  console.log(response.data)
  return response.data
}
const getTimeline = async (token) => {
  console.log("running")
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(config)
  const response = await axios.get(API_URL + "timeline", config)

  return response.data
}
const getSuggestedUsers = async (token) => {
  console.log("running")
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(config)
  const response = await axios.get(API_URL, config)

  return response.data
}
const followOrUnfollow = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(token)
  console.log(config)
  const response = await axios.put(
    `${API_URL}${userId}/followorunfollow`,
    null,
    config
  )
  console.log(response.data)
  return response.data
}
const savePosts = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(token)
  console.log(config)
  const response = await axios.put(
    `${API_URL}${postId}/saveposts`,
    null,
    config
  )
  console.log(response.data)
  return response.data
}

const userService = {
  updateUser,
  getTimeline,
  getUser,
  getUserPosts,

  getSuggestedUsers,
  followOrUnfollow,
  savePosts,
}

export default userService
