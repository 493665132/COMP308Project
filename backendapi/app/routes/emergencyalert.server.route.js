const express = require("express");
const router = express.Router();
const emergencyAlert = require("../controllers/emergencyalert.server.controller");
const verifyUser = require("../../config/auth");
//Getting All Emergency Alert
router.get("/", verifyUser.verify, emergencyAlert.getAllEmergencyAlert);
//Getting One Emergency Alert
router.get("/:id", verifyUser.verify, emergencyAlert.getEmergencyAlertById);
//Update One EmergencyAlert
router.put("/:id", verifyUser.verify, emergencyAlert.updateOneEmergencyAlert);
//Delete One Emergency Alert
router.delete(
  "/:id",
  verifyUser.verify,
  emergencyAlert.deleteEmergencyAlertById
);
//Create One Emergency Alert
router.post("", verifyUser.verify, emergencyAlert.InsertEmergencyAlert);

module.exports = router;
