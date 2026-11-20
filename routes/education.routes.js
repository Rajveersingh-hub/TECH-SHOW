const express = require("express");

const {
    createEducation,
    getEducations,
    updateEducation,
    deleteEducation
} = require("../controllers/education.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware, createEducation);
router.get("/me", authMiddleware, getEducations);
router.patch("/me/:educationId", authMiddleware, updateEducation);
router.delete("/me/:educationId", authMiddleware, deleteEducation);

module.exports = router;