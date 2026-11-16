const mongoose = require("mongoose");

const evidenceSkillSchema = new mongoose.Schema({
    evidenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evidence",
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true
    }
});

module.exports = mongoose.model("EvidenceSkill", evidenceSkillSchema);