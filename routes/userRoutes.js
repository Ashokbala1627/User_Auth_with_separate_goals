const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);

module.exports = router;
