// Load the Mongoose module and Schema object
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Define a new 'EmergencyAlertSchema'
const EmergencyAlertSchema = new Schema({
  messageAlert: {
    type: String,
    required: true,
  },
  timeAndDateOfCreation: {
    type: Date,
    default: Date.now,
  },
  creator: {
    ref: "Users",
    type: mongoose.Schema.Types.ObjectId,
  },
});

// Create the 'EmergencyAlerts' model out of the 'EmergencyAlertSchema'
const EmergencyAlert = mongoose.model("EmergencyAlerts", EmergencyAlertSchema);

module.exports = EmergencyAlert;
