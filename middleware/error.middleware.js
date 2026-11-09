const ApiResponse = require("../utils/ApiResponse");

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json(
        new ApiResponse(statusCode, null, message)
    );
};

module.exports = errorMiddleware;