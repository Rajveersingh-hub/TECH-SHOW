const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Link", linkSchema);