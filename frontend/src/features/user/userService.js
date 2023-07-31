import axios from "axios"
const API_URL = "http://localhost:8000/api/users/"

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
const userService = {
  updateUser,
  getUser,
}

export default userService
