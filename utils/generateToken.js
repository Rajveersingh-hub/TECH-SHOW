const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

module.exports = generateToken;