const express = require("express");
const {createSkill}=require("../controllers/skill.controller")
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
router.post("/create", createSkill);

module.exports = router;