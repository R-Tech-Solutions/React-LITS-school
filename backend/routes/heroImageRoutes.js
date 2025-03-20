const express = require("express");
const router = express.Router();
const heroImageController = require("../controllers/heroImageController");

router.get("/", heroImageController.getHeroImages); // Get all images
router.post("/", heroImageController.uploadHeroImage); // Upload image
router.delete("/:id", heroImageController.deleteHeroImage); // Delete image

module.exports = router;
