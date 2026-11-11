const express = require("express");

const {
    createUserSkill,
    getUserSkills,
    updateUserSkill,
    deleteUserSkill
} = require("../controllers/userSkill.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware, createUserSkill);

router.get("/me", authMiddleware, getUserSkills);

router.patch("/:userSkillId", authMiddleware, updateUserSkill);
router.delete("/:userSkillId", authMiddleware, deleteUserSkill);

module.exports = router;