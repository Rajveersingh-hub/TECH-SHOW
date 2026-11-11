const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const UserSkill = require("../models/userSkill.model");
const Skill = require("../models/skill.model");

const createUserSkill = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { skillId, proficiency } = req.body;

    if (!skillId || !proficiency) {
        throw new ApiError(400, "Skill ID and proficiency are required");
    }

    const skill = await Skill.findById(skillId);

    if (!skill) {
        throw new ApiError(404, "Skill not found");
    }

    const existingUserSkill = await UserSkill.findOne({
        userId,
        skillId
    });

    if (existingUserSkill) {
        throw new ApiError(409, "User skill already exists");
    }

    const userSkill = await UserSkill.create({
        userId,
        skillId,
        level: proficiency
    });

    res.status(201).json(
        new ApiResponse(
            201,
            userSkill,
            "User skill created successfully"
        )
    );
});

const getUserSkills = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userSkills = await UserSkill.find({ userId })
        .populate("skillId");

    res.status(200).json(
        new ApiResponse(
            200,
            userSkills,
            "User skills fetched successfully"
        )
    );
});

const updateUserSkill = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { userSkillId } = req.params;
    const { proficiency } = req.body;

    if (!proficiency) {
        throw new ApiError(400, "Proficiency is required");
    }

    const userSkill = await UserSkill.findOne({
        _id: userSkillId,
        userId
    });

    if (!userSkill) {
        throw new ApiError(404, "User skill not found");
    }

    userSkill.level = proficiency;

    await userSkill.save();

    res.status(200).json(
        new ApiResponse(
            200,
            userSkill,
            "User skill updated successfully"
        )
    );
});
const deleteUserSkill = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { userSkillId } = req.params;

    const userSkill = await UserSkill.findOne({
        _id: userSkillId,
        userId
    });

    if (!userSkill) {
        throw new ApiError(404, "User skill not found");
    }

    await userSkill.deleteOne();

    res.status(200).json(
        new ApiResponse(
            200,
            null,
            "User skill deleted successfully"
        )
    );
});
module.exports = {
    createUserSkill,
    getUserSkills,
    updateUserSkill,
    deleteUserSkill
};