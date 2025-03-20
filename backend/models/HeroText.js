const mongoose = require("mongoose");

const HeroTextSchema = new mongoose.Schema({
  textTitle: { type: String, required: true },
  textDetails: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("HeroText", HeroTextSchema);
