const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, email, password, lastName } = req.body
  //Check if user inserts all the credentials to register
  if (!firstName || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")

    // throw new Error("Insert all the necessary informations.");
  }
  //Check if ther user exists
  const isUserExists = await User.findOne({ email })

  if (isUserExists) {
    res.status(400)
    throw new Error("user already exists.")
    //Hash the password
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName,
    email,
    lastName,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data entered.")
  }
})
//Login user

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  console.log(user)
  const isPassword = await bcrypt.compare(password, user.password)

  if (user && isPassword) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(404)
    throw new Error("Invalid credentials")
  }

  // res.status(500);
  throw new Error(error)
})
//get me
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id)
  const { _id, name, email } = user

  res.status(200).json({
    id: _id,
    name,
    email,
  })
}
//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: "30d",
  })
}
module.exports = { registerUser, logInUser, getMe }
