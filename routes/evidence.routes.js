const express= require("express");
const { createEvidence,getEvidence,updateEvidence,deleteEvidence} = require("../controllers/evidence.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware, createEvidence);
router.get("/get", authMiddleware, getEvidence);
router.patch("/:evidenceId", authMiddleware, updateEvidence);
router.delete("/:evidenceId", authMiddleware, deleteEvidence);

module.exports = router;