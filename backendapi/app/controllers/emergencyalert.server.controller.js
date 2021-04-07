//const EmergencyAlert = require("mongoose").model("EmergencyAlerts");
const EmergencyAlert = require("../models/emergencyalert.server.model");

//Add new Emergency Alert
exports.InsertEmergencyAlert = async (req, res, next) => {
  console.log("InserEmergencyAlert called", req.body);
  //Create a new instance of the 'EmergencyAlert' Mongoose model
  let emergencyAlert = new EmergencyAlert(req.body);
  await emergencyAlert
    .save()
    .then((emergencyAlert) => {
      res.status(200).send({
        message: "Emergency Alert has been created successfully",
        result: emergencyAlert,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).send({ message: error.message });
    });
};

//Get all Emergency Alerts
exports.getAllEmergencyAlert = async (req, res) => {
  await EmergencyAlert.find()
    .sort("-created")
    .populate("creator", "firstName lastName fullName")
    .then((emergencyAlert) => {
      res.status(200).send({
        message: "All Emergency Alert fetched successfully",
        result: emergencyAlert,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Get one Emergency Alert by id
exports.getEmergencyAlertById = async (req, res) => {
  console.log("getEmergencyAlertById", req.params.id);
  // Use the 'EmergencyAlert' static 'findById' method to retrieve a specific EmergencyAlert by Id
  await EmergencyAlert.findById(req.params.id)
    .populate("creator", "firstName lastName fullName")
    .then((emergencyAlert) => {
      if (!emergencyAlert) {
        return res.status(404).send({
          message: "Emergency Alert not found",
          result: emergencyAlert,
        });
      } else {
        res.status(200).send({
          message: "Emergency Alert fetched successfully",
          result: emergencyAlert,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Update one Emergency Alert by id
exports.updateOneEmergencyAlert = async (req, res, next) => {
  console.log("inside update", req.body);
  await EmergencyAlert.findByIdAndUpdate(req.params.id, req.body)
    .then(async (emergencyAlert) => {
      if (!emergencyAlert) {
        return res.status(404).send({
          message: "Emergency Alert not found with id " + req.params.id,
        });
      } else {
        const updatedEmergencyAlert = await EmergencyAlert.findById(
          emergencyAlert._id
        );
        console.log("updated EmergencyAlert -->", updatedEmergencyAlert);
        res.status(200).send({
          message: "EmergencyAlert updated successfully",
          result: updatedEmergencyAlert,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Delete Emergency Alert by id
exports.deleteEmergencyAlertById = async (req, res) => {
  await EmergencyAlert.findByIdAndRemove(req.params.id)
    .then((emergencyAlert) => {
      if (!emergencyAlert) {
        return res.status(404).send({
          message: "Emergency Alert not found with id " + req.params.id,
        });
      }
      res.send({ message: "Emergency Alert deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};