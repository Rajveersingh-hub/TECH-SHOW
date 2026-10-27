const {registerUser}=require("../controllers/user.controller");
const express = require("express");

const router = express.Router();
router.post("/register", registerUser);
module.exports = router;