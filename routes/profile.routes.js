const express = require("express");
const {
  createProfile,
  getMyProfile,
  updateProfile,
} = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create", authMiddleware, createProfile);
router.get("/me", authMiddleware, getMyProfile);
router.patch("/me", authMiddleware, updateProfile);

module.exports = router;
