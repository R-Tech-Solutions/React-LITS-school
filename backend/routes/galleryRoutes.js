const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");

router.post("/", galleryController.createOrUpdateGallery);
router.get("/", galleryController.getAllGalleries);
router.delete("/:id", galleryController.deleteGallery);

module.exports = router;