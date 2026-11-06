const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

   const payload = {
    id: user._id.toString(),
};

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

module.exports = generateToken;