const express = require("express");
const router = express.Router();
const heroTextController = require("../controllers/heroTextController");

router.get("/", heroTextController.getAllHeroText);
router.post("/", heroTextController.createHeroText);
router.put("/:id", heroTextController.updateHeroText);
router.delete("/:id", heroTextController.deleteHeroText);

module.exports = router;
