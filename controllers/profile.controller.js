const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");
const profile = require("../models/profile.model");
const createProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user= await User.findById(userId);
    if(user.profileId){
        throw new ApiError(409,"Profile already exists");
    }
    const { image, bio, location } = req.body;
    if(!image || !bio || !location || !location.city || !location.state || !location.country){
        throw new ApiError(400,"All fields are required");
    }
    const newProfile = await profile.create({
        image,
        bio,
        location,
        userId: userId
    });
    await User.findByIdAndUpdate(userId, { profileId: newProfile._id });
    res.status(201).json(new ApiResponse(201, newProfile, "Profile created successfully"));
});
module.exports = {
    createProfile
};