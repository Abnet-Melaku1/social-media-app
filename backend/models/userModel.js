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
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

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
  { timestamps: true }
)
module.exports = mongoose.model("User", userSchema)
