import axios from "axios"

const API_URL = `${process.env.REACT_APP_API_URL}posts/`
console.log(API_URL)

const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(postData)

  const response = await axios.post(API_URL, postData, config)

  return response.data
}
const createComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.post(API_URL + "comments", commentData, config)
    return response.data
  } catch (error) {
    console.error("Error in createComment:", error)
    throw error // Re-throw the error for further handling in your application
  }
}
const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.get(`${API_URL}/${postId}`, config)
    return response.data
  } catch (error) {
    // Handle any potential errors here
    console.error("Error in getPost:", error)
    throw error // Re-throw the error for further handling in your application
  }
}
const likeOrRemove = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(token)
  console.log(config)
  const response = await axios.put(
    `${API_URL}${postId}/likeordislike`,
    null,
    config
  )
  console.log(response.data)
  return response.data
}
const postService = {
  createPost,
  createComment,
  likeOrRemove,
  getPost,
}

export default postService
