const Post = require("../models/userModel")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  })
  return res
}
//update user

//_id is the post id and user is the user id

const updateUser = async (req, res) => {
  const { user } = req

  const { firstName, lastName, country, email } = req.body
  console.log(req.file)

  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64")
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64
    const cldRes = await handleUpload(dataURI)
    const data = {
      email,
      firstName,
      lastName,
      country,
      profilePicture: {
        url: cldRes.secure_url,
        cloudinaryId: cldRes.asset_id,
      },
    }
    const userUpdated = await User.findByIdAndUpdate(user.id, data, {
      new: true,
    })
    // console.log(data)
    if (!userUpdated) {
      return res.status(404).json({ error: "User not found" })
    }
    console.log("updatedUser", userUpdated)
    res.status(200).json(userUpdated)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: [{ msg: "Server error" }] })
  }
}
//Get user
const getUser = async (req, res) => {
  const user = await User.findById(req.user.id)
  const { email, firstName, lastName, country, profilePicture } = user
  res.status(200).json({
    email,
    firstName,
    lastName,
    country,
    profilePicture,
  })
}
//const deleter user

const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id)
      return res.status(200).json("user deleted successfully")
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    res.status(403).json("unauthorized user.")
  }
}
//Follow and following
const followerAndFollowing = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user.id)
  console.log("current user" + currentUser.id)
  const user = await User.findById(req.params.id)
  console.log("user: " + user.id)
  if (currentUser.id !== user.id) {
    if (!user.followers.includes(req.user.id)) {
      await user.updateOne({ $push: { followers: req.user.id } })
      await currentUser.updateOne({ $push: { followings: req.params.id } })
      res.status(200).json("The user has been followed")
    } else {
      await user.updateOne({ $pull: { followers: req.user.id } })
      await currentUser.updateOne({ $pull: { followings: req.params.id } })
      res.status(200).json("The user has been unfollowed")
    }

    res.status(500)
  } else {
    res.status(403).json("You can't follow your self.")
  }
})
module.exports = { deleteUser, updateUser, followerAndFollowing, getUser }
