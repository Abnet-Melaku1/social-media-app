const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    desc: {
      type: String,
      max: 500,
    },
    image: {
      url: String,
      cloudinaryId: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
)
module.exports = mongoose.model("Post", postSchema)
postSchema.pre("save", function (next) {
  if (this.isNew && this.isSaved === undefined) {
    this.isSaved = false
  }
  next()
})
