const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    websiteType: {
        type: String,
        required: true,
    },
    designTone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const themeModel = new mongoose.model("images", themeSchema);
module.exports = themeModel;