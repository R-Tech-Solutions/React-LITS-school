const mongoose = require("mongoose");

const VisionMissionSchema = new mongoose.Schema({
    visionTitle: { type: String},
    visionText: { type: String, required: true },
    missionTitle: { type: String},
    missionText: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("VisionMission", VisionMissionSchema);
