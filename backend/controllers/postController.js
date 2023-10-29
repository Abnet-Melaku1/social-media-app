const jwt = require("jsonwebtoken")
const Post = require("../models/postsModels")
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

//create post
const createPost = async (req, res) => {
  try {
    console.log(req.user)
    let cldRes = {}

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64")
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64
      cldRes = await handleUpload(dataURI)
    }

    const post = new Post({
      user: req.user.id,
      desc: req.body.desc,
      image: {
        url: cldRes.secure_url || "",
        cloudinaryId: cldRes.asset_id || "",
      },
    })

    await post.save()
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: [{ msg: "Server error" }] })
  }
}

//get a post
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId).populate({
    path: "comments.user",
    model: "User",
    select: "firstName lastName profilePicture",
  })

  if (!post) {
    return res.status(404).json({ message: "Post not found" })
  }

  post.comments = await Promise.all(
    post.comments.map(async (comment) => {
      const populatedComment = comment.toObject()
      populatedComment.createdAt = comment.createdAt
      populatedComment.updatedAt = comment.updatedAt
      return populatedComment
    })
  )

  res.json(post)
})

//get add Comment
const addComment = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { postId, text } = req.body
  console.log("postId", postId)
  try {
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const comment = {
      user: req.user.id,
      text: text,
    }

    post.comments.push(comment)

    await post.save()

    res
      .status(201)
      .json({ message: "Comment added successfully", updatedPost: post })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error adding comment" })
  }
})
//get users post
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
      .populate("followers", "firstName lastName profilePicture")
      .populate("followings", "firstName lastName profilePicture")
      .exec()

    if (!user) {
      return res.status(404).json("User not found")
    }

    const posts = await Post.find({ user: userId })

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      country: user.country,
      followers: user.followers,
      followings: user.followings,
      bio: user.bio,
    }

    const userPosts = {
      user: userData,
      posts: posts,
    }

    res.status(200).json(userPosts)
  } catch (err) {
    res.status(500).json(err)
  }
}

//get timeline posts
const getTimeline = async (req, res) => {
  console.log("rendered")
  try {
    const currentUser = await User.findById(req.user.id)
    const userPosts = await Post.find({ user: req.user.id }).populate(
      "user",
      "firstName lastName profilePicture"
    )

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ user: friendId }).populate(
          "user",
          "firstName lastName profilePicture"
        )
      })
    )

    const allPosts = userPosts.concat(...friendPosts)

    if (allPosts.length === 0) {
      // If the concatenated posts are empty, fetch posts from the database.
      const allPostsFromDB = await Post.find({}).populate(
        "user",
        "firstName lastName profilePicture"
      )
      res.status(200).json(allPostsFromDB)
    } else {
      res.status(200).json(allPosts)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

//get user posts
//update post
const updatePost = asyncHandler(async (req, res) => {
  //check for the post
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error("post not found")
  }
  //check for the user
  if (!req.user) {
    res.status(401)
    throw new Error("user not found")
  }
  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost)
})
//Delete post
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error("post not found")
  }
  //check for the user
  if (!req.user) {
    res.status(401)
    throw new Error("user not found")
  }
  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const deletedPost = await Post.findByIdAndDelete(req.params.id)

  res.status(200).json(deletedPost)
})
//like or dislike post
const likeAndDislikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  try {
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } })
      await post.updateOne({ isLiked: true })
      const updatedPost = await Post.findById(req.params.id)
      res.status(200).json({ message: "Liked", post: updatedPost })
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } })
      await post.updateOne({ isLiked: false })
      const updatedPost = await Post.findById(req.params.id)
      res.status(200).json({ message: "Like Removed.", post: updatedPost })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//save posts
const savePosts = async (req, res) => {
  const post = await Post.findById(req.params.postId)
  const user = await User.findById(req.user.id)

  try {
    if (!user.savedPosts.includes(post.id)) {
      await user.updateOne({ $push: { savedPosts: post.id } })
      await post.updateOne({ isSaved: true })
      res.status(200).json("post saved successfully.")
    } else {
      await user.updateOne({ $pull: { savedPosts: post.id } })
      await post.updateOne({ isSaved: false })

      res.status(200).json("post removed from saved posts.")
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
module.exports = {
  createPost,
  updatePost,
  getPost,
  getUserPosts,
  likeAndDislikePost,
  getTimeline,
  deletePost,
  addComment,
  savePosts,
}
