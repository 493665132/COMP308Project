const config = require("./config");
const mongoose = require("mongoose");

// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log("Error");
    });

  // Load the 'Users' and 'DailyInfo'  and 'HDChecklist' and 'EmergencyAlert' models
  require("../app/models/user.server.model");
  require("../app/models/dailyinfo.server.model");
  require("../app/models/hdchecklist.server.model");
  require("../app/models/emergencyalert.server.model")

  // Return the Mongoose connection instance
  return db;
};
