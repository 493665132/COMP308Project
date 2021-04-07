//const DailyInfo = require("mongoose").model("DailyInfo");
const DailyInfo = require("../models/dailyinfo.server.model");

//Add new DailyInfo
exports.InsertDailyInfo = async (req, res, next) => {
  console.log("InserDailyInfo called", req.body);
  //Create a new instance of the 'DailyInfo' Mongoose model
  let dailyInfo = new DailyInfo(req.body);
  await dailyInfo
    .save()
    .then((dailyInfo) => {
      res.status(200).send({
        message: "DailyInfo has been created successfully",
        result: dailyInfo,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).send({ message: error.message });
    });
};

//Get all Daily Info
exports.getAllDailyInfo = async (req, res) => {
  await DailyInfo.find()
    .sort("-created")
    .populate("creator", "firstName lastName fullName")
    .then((dailyInfo) => {
      res.status(200).send({
        message: "All DailyInfo fetched successfully",
        result: dailyInfo,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Get one DailyInfo by id
exports.getDailyInfoById = async (req, res) => {
  console.log("getDailyInfoById", req.params.id);
  // Use the 'DailyInfo' static 'findById' method to retrieve a specific DailyInfo by Id
  await DailyInfo.findById(req.params.id)
    .populate("creator", "firstName lastName fullName")
    .then((dailyInfo) => {
      if (!dailyInfo) {
        return res
          .status(404)
          .send({ message: "DailyInfo not found", result: dailyInfo });
      } else {
        res.status(200).send({
          message: "DailyInfo fetched successfully",
          result: dailyInfo,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Update one DailyInfo by id
exports.updateOneDailyInfo = async (req, res, next) => {
  console.log("inside update", req.body);
  await DailyInfo.findByIdAndUpdate(req.params.id, req.body)
    .then(async (dailyInfo) => {
      if (!dailyInfo) {
        return res.status(404).send({
          message: "DailyInfo not found with id " + req.params.id,
        });
      } else {
        const updatedDailyInfo = await DailyInfo.findById(dailyInfo._id);
        console.log("updated DailyInfo -->", updatedDailyInfo);
        res.status(200).send({
          message: "DailyInfo updated successfully",
          result: updatedDailyInfo,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Delete DailyInfo by id
exports.deleteDailyInfoById = async (req, res) => {
  await DailyInfo.findByIdAndRemove(req.params.id)
    .then((dailyInfo) => {
      if (!dailyInfo) {
        return res.status(404).send({
          message: "DailyInfo not found with id " + req.params.id,
        });
      }
      res.send({ message: "DailyInfo deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
