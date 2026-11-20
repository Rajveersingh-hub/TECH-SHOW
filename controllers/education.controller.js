const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const Education = require("../models/education.model");

const createEducation = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const {
        institution,
        degree,
        field,
        startDate,
        endDate,
        grade,
        description
    } = req.body;

    if (!institution || !degree || !field || !startDate) {
        throw new ApiError(
            400,
            "Institution, degree, field and start date are required"
        );
    }

    const education = await Education.create({
        userId,
        institution,
        degree,
        field,
        startDate,
        endDate,
        grade,
        description
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            education,
            "Education created successfully"
        )
    );
});
const getEducations = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const educations = await Education.find({
        userId
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            educations,
            "Education records retrieved successfully"
        )
    );
});
const updateEducation = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { educationId } = req.params;

    const {
        institution,
        degree,
        field,
        startDate,
        endDate,
        grade,
        description
    } = req.body;

    const education = await Education.findOne({
        _id: educationId,
        userId
    });

    if (!education) {
        throw new ApiError(404, "Education record not found");
    }

    if (institution !== undefined) education.institution = institution;
    if (degree !== undefined) education.degree = degree;
    if (field !== undefined) education.field = field;
    if (startDate !== undefined) education.startDate = startDate;
    if (endDate !== undefined) education.endDate = endDate;
    if (grade !== undefined) education.grade = grade;
    if (description !== undefined) education.description = description;

    await education.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            education,
            "Education updated successfully"
        )
    );
});
const deleteEducation = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { educationId } = req.params;

    const education = await Education.findOne({
        _id: educationId,
        userId
    });

    if (!education) {
        throw new ApiError(404, "Education record not found");
    }

    await education.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Education deleted successfully"
        )
    );
});

module.exports = {
    createEducation,
    getEducations,
    updateEducation,
    deleteEducation
};