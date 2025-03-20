const mongoose = require("mongoose");

const heroImageSchema = new mongoose.Schema({
    imageData: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("HeroImage", heroImageSchema);
