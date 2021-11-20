const { authUser, registerUser } = require("../controllers/userControllers");

// const { protect } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
