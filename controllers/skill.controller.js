const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Skill = require("../models/skill.model");

const createSkill = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required");
    }

    const skill = await Skill.create({
        name,
        description
    });

    res.status(201).json(
        new ApiResponse(
            201,
            skill,
            "Skill created successfully"
        )
    );
});

module.exports = {
    createSkill
};