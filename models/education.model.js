const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    institution: {
        type: String,
        required: true
    },

    degree: {
        type: String,
        required: true
    },

    field: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: false
    },

    grade: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Education", educationSchema);