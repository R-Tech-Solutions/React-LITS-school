const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
  logo: { type: String, required: true }, // Base64 image string
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  facebook: { type: String },
  instagram: { type: String },
  tiktok: { type: String },
});

const Footer = mongoose.model("Footer", FooterSchema);
module.exports = Footer;
