const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

// reigster controller
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
  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});
// login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "invalid email or password");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "invalid email or password");
  }
  const token = generateToken(user);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: user,
        token: token,
      },
      "User logged in successfully",
    ),
  );
});
module.exports = {
  registerUser,
  loginUser,
};
