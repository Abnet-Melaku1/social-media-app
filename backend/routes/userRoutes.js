const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const { protect } = require("../middlewares/authMiddleWare")
const {
  deleteUser,
  updateUser,
  followerAndFollowing,
  getUser,
} = require("../controllers/userController")
const Multer = require("multer")

const storage = new Multer.memoryStorage()
const upload = Multer({
  storage,
})
//update user

router.post("/updateuser", [protect, upload.single("file")], updateUser)
router.get("/getuser", protect, getUser)

router.delete("/:id", protect, deleteUser)
router.put("/:id/followorunfollow", protect, followerAndFollowing)
module.exports = router
