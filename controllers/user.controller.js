const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // all feilds requrire
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const user = await User.create({ name, email, password });
  res.status(201).json(new ApiResponse(201,user, "User registered successfully"));
});
module.exports={
    registerUser
}
