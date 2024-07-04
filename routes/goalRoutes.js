const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  getGoal,
  setGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goalController");

router.route("/").get(auth, getGoal).post(auth, setGoal);
router.route("/:id").delete(auth, deleteGoal).put(auth, updateGoal);

module.exports = router;
