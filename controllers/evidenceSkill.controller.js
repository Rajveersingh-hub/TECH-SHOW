const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const EvidenceSkill = require("../models/evidenceSkill.model");
const Evidence = require("../models/evidence.model");
const Skill = require("../models/skill.model");

const createEvidenceSkill = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const { evidenceId, skillId } = req.body;

    if (!evidenceId || !skillId) {
        throw new ApiError(400, "Evidence ID and skill ID are required");
    }

    const evidence = await Evidence.findOne({
        _id: evidenceId,
        userId
    });

    if (!evidence) {
        throw new ApiError(404, "Evidence not found");
    }

    const skill = await Skill.findById(skillId);

    if (!skill) {
        throw new ApiError(404, "Skill not found");
    }

    const existingEvidenceSkill = await EvidenceSkill.findOne({
        evidenceId,
        skillId
    });

    if (existingEvidenceSkill) {
        throw new ApiError(409, "Evidence is already linked to this skill");
    }

    const evidenceSkill = await EvidenceSkill.create({
        evidenceId,
        skillId
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            evidenceSkill,
            "Evidence linked to skill successfully"
        )
    );
});
const getEvidenceSkills = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { evidenceId } = req.params;

    if (!evidenceId) {
        throw new ApiError(400, "Evidence ID is required");
    }

    const evidence = await Evidence.findOne({
        _id: evidenceId,
        userId
    });

    if (!evidence) {
        throw new ApiError(404, "Evidence not found");
    }

    const evidenceSkills = await EvidenceSkill.find({
        evidenceId: evidenceId
    }).populate("skillId");

    res.status(200).json(
        new ApiResponse(
            200,
            {
                evidence,
                skills: evidenceSkills
            },
            "Evidence skills found"
        )
    );
});
const deleteEvidenceSkill = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { evidenceId, skillId } = req.params;

    if (!evidenceId || !skillId) {
        throw new ApiError(400, "Evidence ID and skill ID are required");
    }

    const evidence = await Evidence.findOne({
        _id: evidenceId,
        userId
    });

    if (!evidence) {
        throw new ApiError(404, "Evidence not found");
    }

    const evidenceSkill = await EvidenceSkill.findOneAndDelete({
        evidenceId,
        skillId
    });

    if (!evidenceSkill) {
        throw new ApiError(404, "Evidence skill not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            evidenceSkill,
            "Evidence skill deleted successfully"
        )
    );
});
module.exports = {
    createEvidenceSkill,
    getEvidenceSkills,
    deleteEvidenceSkill
};