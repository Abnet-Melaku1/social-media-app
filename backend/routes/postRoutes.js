const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleWare");
const {
  createPost,
  updatePost,
  deletePost,
  likeAndDislikePost,
  comments,
  savedPosts,
} = require("../controllers/postController");

router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.post("/:id/comments", protect, comments);
router.delete("/:id", protect, deletePost);
router.put("/:id/likeordislike", protect, likeAndDislikePost);
router.put("/:id/saveposts", protect, savedPosts);
module.exports = router;
