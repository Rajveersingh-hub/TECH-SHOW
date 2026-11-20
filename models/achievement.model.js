const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    issuer: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Achievement", achievementSchema);