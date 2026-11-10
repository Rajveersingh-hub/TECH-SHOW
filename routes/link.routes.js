const express = require("express");
const { createLink, getLinks,updateLink,deleteLink} = require("../controllers/link.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware, createLink);
router.get("/me", authMiddleware, getLinks);
router.patch("/:linkId", authMiddleware, updateLink);
router.delete("/:linkId", authMiddleware, deleteLink);
module.exports = router;