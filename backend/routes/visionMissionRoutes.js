const express = require("express");
const router = express.Router();
const visionMissionController = require("../controllers/visionMissionController");

router.get("/", visionMissionController.getAllVisionMissions);
router.post("/", visionMissionController.createVisionMission);
router.put("/:id", visionMissionController.updateVisionMission);
router.delete("/:id", visionMissionController.deleteVisionMission);

module.exports = router;
