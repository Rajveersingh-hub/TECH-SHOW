const express = require("express");
const { createProfile } = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();    

router.post("/create", authMiddleware, createProfile);

module.exports = router;