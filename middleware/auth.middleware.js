const ApiResponse = require("../utils/ApiResponse");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
        return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
    }

    if (!process.env.JWT_SECRET) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Authentication is not configured"));
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res
            .status(401)
            .json(new ApiResponse(401, null, "Invalid or expired token"));
    }
};

module.exports = authMiddleware;