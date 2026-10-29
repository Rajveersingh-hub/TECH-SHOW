const ApiResponse = require("../utils/ApiResponse");
const jwt= require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    // yahan authorization header lena hai
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
    }
    const token = authHeader.substring(7);
    // yahan token ko verify karna hai
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      next();
    
      // next step mein decoded ko req.user mein store karenge
} catch (error) {
      return res.status(401).json(
          new ApiResponse(401, null, "Invalid or expired token")
      );
}
};

module.exports = authMiddleware;