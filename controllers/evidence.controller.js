const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Evidence = require("../models/evidence.model");

const createEvidence = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const { type, title, description, url, date } = req.body;
    if (!type || !title || !description || !url) {
        throw new ApiError(400, "Missing required fields");
    }
    const evidence = await Evidence.create({
        userId,
        type,
        title,
        description,
        url,
        date
    });

    return res.status(201).json(new ApiResponse(201, evidence, "Evidence created successfully"));

   
});
const getEvidence = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    const evidence = await Evidence.find({ userId });

    return res.status(200).json(new ApiResponse(200, evidence, "Evidence retrieved successfully"));
});
const updateEvidence = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { evidenceId } = req.params;
    const { type, title, description, url, date } = req.body;

    const evidence = await Evidence.findOne({
        _id: evidenceId,
        userId
    });

    if (!evidence) {
        throw new ApiError(404, "Evidence not found");
    }

    if (type !== undefined) evidence.type = type;
    if (title !== undefined) evidence.title = title;
    if (description !== undefined) evidence.description = description;
    if (url !== undefined) evidence.url = url;
    if (date !== undefined) evidence.date = date;

    await evidence.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            evidence,
            "Evidence updated successfully"
        )
    );
});
const deleteEvidence = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { evidenceId } = req.params;  

    const evidence = await Evidence.findOne({
        _id: evidenceId,
        userId
    });

    if (!evidence) {
        throw new ApiError(404, "Evidence not found");
    }

    await evidence.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Evidence deleted successfully"
        )
    );
});
module.exports = {
    createEvidence,
    getEvidence,
    updateEvidence,
    deleteEvidence
};