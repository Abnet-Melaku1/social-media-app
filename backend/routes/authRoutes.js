const express = require("express")
const router = express.Router()
const {
  registerUser,
  logInUser,
  getMe,
} = require("../controllers/authController")
const { protect } = require("../middlewares/authMiddleWare")

// router.get("/", (req, res) => {
//   res.send("I'm Back with Amazin' energy.");
// });
router.post("/register", registerUser)
router.post("/login", logInUser)
router.get("/me", protect, getMe)

module.exports = router
