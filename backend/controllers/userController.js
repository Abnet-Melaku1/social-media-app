const Post = require("../models/postsModels")
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
    let cldRes = {}

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64")
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64
      cldRes = await handleUpload(dataURI)
    }
    const data = {
      email,
      firstName,
      lastName,
      country,
      profilePicture: {
        url: cldRes.secure_url || "",
        cloudinaryId: cldRes.asset_id || "",
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
  const {
    email,
    firstName,
    lastName,
    country,
    profilePicture,
    followings,
    followers,
  } = user
  res.status(200).json({
    email,
    firstName,
    lastName,
    country,
    profilePicture,
    followings,
    followers,
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
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json("User not found")
  }

  try {
    const isFollowing = currentUser.followings.includes(user.id)

    if (currentUser.id !== user.id) {
      if (!isFollowing) {
        // Follow the user
        currentUser.followings.push(user.id)
        user.followers.push(currentUser.id)
        await currentUser.save()
        await user.save()
        res.status(200).json({
          message: "You are now following the user",
          updatedUser: user,
        })
      } else {
        // Unfollow the user
        const currentUserIndex = user.followers.indexOf(currentUser.id)
        const userIndex = currentUser.followings.indexOf(user.id)
        if (currentUserIndex !== -1) {
          currentUser.followings.splice(userIndex, 1)
          user.followers.splice(currentUserIndex, 1)
          await currentUser.save()
          await user.save()
        }
        res.status(200).json({
          message: "You have unfollowed the user",
          updatedUser: user,
        })
      }
    } else {
      res.status(403).json("You can't follow yourself.")
    }
  } catch (error) {
    res.status(500).json("An error occurred")
  }
})

const getSuggestedUsers = async (req, res) => {
  try {
    const users = await User.find().lean().exec()
    res.status(200).json(users)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching all users", error: error.message })
  }
}
const savePosts = async (req, res) => {
  console.log("working", req.params.id)
  console.log("req.user", req.user.id)

  const post = await Post.findById(req.params.id)

  const user = await User.findById(req.user.id)
  console.log("post", post)
  console.log("user", user)

  try {
    if (!user.savedPosts.includes(post.id)) {
      await user.updateOne({ $push: { savedPosts: post.id } })
      await post.updateOne({ isSaved: true })
      const updatedPost = await Post.findById(req.params.id) // Retrieve the updated post
      res
        .status(200)
        .json({ message: "Post saved successfully.", post: updatedPost })
    } else {
      await user.updateOne({ $pull: { savedPosts: post.id } })
      await post.updateOne({ isSaved: false })
      const updatedPost = await Post.findById(req.params.id) // Retrieve the updated post
      res
        .status(200)
        .json({ message: "Post removed from saved posts.", post: updatedPost })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
const getSavedPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id)

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" })
    }

    // Fetch saved posts using the savedPosts array
    const savedPosts = await Post.find({
      _id: { $in: currentUser.savedPosts },
    }).populate("user", "firstName lastName profilePicture")

    res.status(200).json(savedPosts)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching saved posts", error: err.message })
  }
}
const test = async (req, res) => {
  res.send("everything is working")
}
module.exports = {
  getSavedPosts,
  deleteUser,
  updateUser,
  followerAndFollowing,
  getUser,
  test,
  savePosts,
  getSuggestedUsers,
}
