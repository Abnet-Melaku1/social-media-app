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
const userService = {
  updateUser,
}

export default userService
