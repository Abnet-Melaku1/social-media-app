import axios from "axios"

const API_URL = `${process.env.REACT_APP_API_URL}auth/`
//Register user"http://localhost:8000"
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}
//Logout user
const logout = () => {
  localStorage.removeItem("user")
}
//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}
const authService = {
  register,
  logout,
  login,
}
export default authService
