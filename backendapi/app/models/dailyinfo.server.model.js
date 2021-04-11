// Load the Mongoose module and Schema object
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/*pulse rate, blood pressure, weight, temperature, respiratory rate).*/
// Define a new 'DailyInfoSchema'
const DailyInfoSchema = new Schema({
  pulserate: {
    type: Number,
    required: true,
  },
  bloodpressure: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  respiratoryrate: {
    type: Number,
    required: true,
  },
  creator: {
    ref: "Users",
    type: mongoose.Schema.Types.ObjectId,
  },
});

// Create the 'DailyInfo' model out of the 'DailyInfochema'
const DailyInfo = mongoose.model("DailyInfo", DailyInfoSchema);

module.exports = DailyInfo;
