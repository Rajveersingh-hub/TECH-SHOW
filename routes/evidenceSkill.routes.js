const express = require("express");

const {
    createEvidenceSkill,
    getEvidenceSkills,
    deleteEvidenceSkill
} = require("../controllers/evidenceSkill.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware, createEvidenceSkill);
router.get("/:evidenceId", authMiddleware, getEvidenceSkills);
router.delete("/:evidenceId/:skillId", authMiddleware, deleteEvidenceSkill);

module.exports = router;