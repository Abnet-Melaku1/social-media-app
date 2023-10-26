const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const { protect } = require("../middlewares/authMiddleWare")
const {
  deleteUser,
  updateUser,
  followerAndFollowing,
  getUser,
  getSuggestedUsers,
  savePosts,
  getSavedPosts,
  test,
} = require("../controllers/userController")
const Multer = require("multer")
const { getTimeline, getUserPosts } = require("../controllers/postController")

const storage = new Multer.memoryStorage()
const upload = Multer({
  storage,
})
//update user
router.get("/test", test)
router.get("/", protect, getSuggestedUsers)
router.put("/:id/followorunfollow", protect, followerAndFollowing)
router.post("/updateuser", [protect, upload.single("file")], updateUser)
router.put("/:id/saveposts", protect, savePosts)

router.get("/getuser", protect, getUser)
router.get("/getsavedposts", protect, getSavedPosts)
router.get("/timeline", protect, getTimeline)
router.get("/:userId", protect, getUserPosts)
router.delete("/:id", protect, deleteUser)
module.exports = router
