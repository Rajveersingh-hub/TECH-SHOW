const {registerUser,loginUser}=require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, (req, res) => {
     res.json({
        message: "Protected route accessed",
        user: req.user
    });
});
module.exports = router;