const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please add your name."],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "please add an email."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "please add your password."],
    },
    profilePicture: {
      url: String,
      cloudinaryId: String,
    },
    country: {
      type: String,
      default: "",
    },
    coverpicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },

    bio: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
      enum: [1, 2, 3],
    },
    savedPosts: {
      type: Array,
      default: [],
    },
  },
  { timestapms: true }
)
module.exports = mongoose.model("User", userSchema)
