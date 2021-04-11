// Load the Mongoose module and Schema object
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Define a new 'HDChecklistSchema'
const HDChecklistSchema = new Schema({
  olderThan50: {
    type: Boolean,
    required: true,
  },
  haveChestPain: {
    type: Boolean,
    required: true,
  },
  fastingBloodSugarGR120mg: {
    type: Boolean,
    required: true,
  },
  haveAnginaFromExercising: {
    type: Boolean,
    required: true,
  },
  identifyAsFemale: {
    type: Boolean,
    required: true,
  },
  restingBloodPressure: {
    type: Number,
    required: true,
  },
  serumColesterolmg: {
    type: Number,
    required: true,
  },
  maxHeartRateAchieved: {
    type: Number,
    required: true,
  },
  creator: {
    ref: "Users",
    type: mongoose.Schema.Types.ObjectId,
  },
});

// Create the 'HDChecklist' model out of the 'HDChecklistSchema'
const HDChecklist = mongoose.model("HDChecklist", HDChecklistSchema);

module.exports = HDChecklist;
