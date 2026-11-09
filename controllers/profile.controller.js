const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");
const Profile = require("../models/profile.model");
// create profile
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
    const newProfile = await Profile.create({
        image,
        bio,
        location,
        userId: userId
    });
    await User.findByIdAndUpdate(userId, { profileId: newProfile._id });
    res.status(201).json(new ApiResponse(201, newProfile, "Profile created successfully"));
});
//view profile
const getMyProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    res.status(200).json(
        new ApiResponse(200, profile, "Profile fetched successfully")
    );
});
//update profile
const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
   const profile = await Profile.findOne({ userId });
  if (!profile) {
    throw new ApiError(404, "Profile not found");
}
 const { image, bio, location } = req.body;
 const updates = {};

if (bio !== undefined) {
    updates.bio = bio;
}

if (image !== undefined) {
    updates.image = image;
}

if (location !== undefined) {
    updates.location = location;
}
if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No fields to update");
}
Object.assign(profile, updates);

await profile.save();
res.status(200).json(
    new ApiResponse(200, profile, "Profile updated successfully")
);
 

});
module.exports = {
    createProfile,
    getMyProfile,
    updateProfile
};