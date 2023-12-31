const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("this is token:" + token)
      // Get token from header
      token = req.headers.authorization.split(" ")[1]
      console.log(token)

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRETE)

      // Get user from the token
      //we can access req.user from any protected routes
      req.user = await User.findById(decoded.id).select("-password")
      console.log(req.user)

      next()
    } catch (error) {
      console.log(error)
      //401 means not authorized
      res.status(401)
      throw new Error("Not authorized")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }
