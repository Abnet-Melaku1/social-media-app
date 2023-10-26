const express = require("express")
const router = express.Router()
const { protect } = require("../middlewares/authMiddleWare")
const {
  createPost,
  updatePost,
  deletePost,
  likeAndDislikePost,
  addComment,
  savePosts,
  getPost,
  getUserPosts,
} = require("../controllers/postController")
const Multer = require("multer")

const storage = new Multer.memoryStorage()
const upload = Multer({
  storage,
})
router.post("/comments", protect, addComment)
router.post("/", [protect, upload.single("file")], createPost)
router.get("/:postId", protect, getPost)
router.get("/:userId", protect, getUserPosts)
router.put("/:id", protect, updatePost)
router.delete("/:id", protect, deletePost)
router.put("/:id/likeordislike", protect, likeAndDislikePost)

module.exports = router
