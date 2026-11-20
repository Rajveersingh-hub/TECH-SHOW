const express = require("express");

const {
    createAchievement,
    getAchievements,
    updateAchievement,
    deleteAchievement
} = require("../controllers/achievement.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware, createAchievement);
router.get("/me", authMiddleware, getAchievements);
router.patch("/:achievementId", authMiddleware, updateAchievement);
router.delete("/:achievementId", authMiddleware, deleteAchievement);

module.exports = router;