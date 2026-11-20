const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const Achievement = require("../models/achievement.model");

const createAchievement = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const {
        title,
        description,
        issuer,
        date,
        url
    } = req.body;

    if (!title || !description || !issuer || !date || !url) {
        throw new ApiError(400, "All fields are required");
    }

    const achievement = await Achievement.create({
        userId,
        title,
        description,
        issuer,
        date,
        url
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            achievement,
            "Achievement created successfully"
        )
    );
});
const getAchievements = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const achievements = await Achievement.find({
        userId
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            achievements,
            "Achievements retrieved successfully"
        )
    );
});
const updateAchievement = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { achievementId } = req.params;

    const {
        title,
        description,
        issuer,
        date,
        url
    } = req.body;

    const achievement = await Achievement.findOne({
        _id: achievementId,
        userId
    });

    if (!achievement) {
        throw new ApiError(404, "Achievement not found");
    }

    if (title !== undefined) achievement.title = title;
    if (description !== undefined) achievement.description = description;
    if (issuer !== undefined) achievement.issuer = issuer;
    if (date !== undefined) achievement.date = date;
    if (url !== undefined) achievement.url = url;

    await achievement.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            achievement,
            "Achievement updated successfully"
        )
    );
});
const deleteAchievement = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { achievementId } = req.params;

    const achievement = await Achievement.findOne({
        _id: achievementId,
        userId
    });

    if (!achievement) {
        throw new ApiError(404, "Achievement not found");
    }

    await achievement.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Achievement deleted successfully"
        )
    );
});
module.exports = {
    createAchievement,
    getAchievements,
    updateAchievement,
    deleteAchievement
};