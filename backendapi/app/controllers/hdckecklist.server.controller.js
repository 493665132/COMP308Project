//const HDChecklist = require("mongoose").model("HDChecklist");
const HDChecklist = require("../models/hdchecklist.server.model");

//Add new HDChecklist
exports.InsertHDChecklist = async (req, res, next) => {
  console.log("InserHDChecklist called", req.body);
  //Create a new instance of the 'HDChecklist' Mongoose model
  let hdChecklist = new HDChecklist(req.body);
  await hdChecklist
    .save()
    .then((hdChecklist) => {
      res.status(200).send({
        message: "HDChecklist has been created successfully",
        result: hdChecklist,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).send({ message: error.message });
    });
};

//Get all HDChecklist
exports.getAllHDChecklist = async (req, res) => {
  await HDChecklist.find()
    .sort("-created")
    .populate("creator", "firstName lastName fullName")
    .then((hdChecklist) => {
      res.status(200).send({
        message: "All HDChecklist fetched successfully",
        result: hdChecklist,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Get one HDChecklist by id
exports.getHDChecklistById = async (req, res) => {
  console.log("getHDChecklistById", req.params.id);
  // Use the 'HDChecklist' static 'findById' method to retrieve a specific HDChecklist by Id
  await HDChecklist.findById(req.params.id)
    .populate("creator", "firstName lastName fullName")
    .then((hdChecklist) => {
      if (!hdChecklist) {
        return res
          .status(404)
          .send({ message: "HDChecklist not found", result: hdChecklist });
      } else {
        res.status(200).send({
          message: "HDChecklist fetched successfully",
          result: hdChecklist,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Update one HDChecklist by id
exports.updateOneHDChecklist = async (req, res, next) => {
  console.log("inside update", req.body);
  await HDChecklist.findByIdAndUpdate(req.params.id, req.body)
    .then(async (hdChecklist) => {
      if (!hdChecklist) {
        return res.status(404).send({
          message: "HDChecklist not found with id " + req.params.id,
        });
      } else {
        const updatedHDChecklist = await HDChecklist.findById(hdChecklist._id);
        console.log("updated HDChecklist -->", updatedHDChecklist);
        res.status(200).send({
          message: "HDChecklist updated successfully",
          result: updatedHDChecklist,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Delete HDChecklist by id
exports.deleteHDChecklistById = async (req, res) => {
  await HDChecklist.findByIdAndRemove(req.params.id)
    .then((hdChecklist) => {
      if (!hdChecklist) {
        return res.status(404).send({
          message: "HDChecklist not found with id " + req.params.id,
        });
      }
      res.send({ message: "HDChecklist deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
