const Post = require("../models/userModel");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//update user

//_id is the post id and user is the user id

const updateUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json("account has been updated.");
    } catch (err) {
      return res.status(500).json(err);
    }
    return res.status(403).json("unauthorized user.");
  }
};
//const deleter user

const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("user deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("unauthorized user.");
  }
};
//Follow and following
const followerAndFollowing = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  console.log("current user" + currentUser.id);
  const user = await User.findById(req.params.id);
  console.log("user: " + user.id);
  if (currentUser.id !== user.id) {
    if (!user.followers.includes(req.user.id)) {
      await user.updateOne({ $push: { followers: req.user.id } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json("The user has been followed");
    } else {
      await user.updateOne({ $pull: { followers: req.user.id } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json("The user has been unfollowed");
    }

    res.status(500);
  } else {
    res.status(403).json("You can't follow your self.");
  }
});
module.exports = { deleteUser, updateUser, followerAndFollowing };
