const express = require("express");
const router = express.Router();
const hdChecklist = require("../controllers/hdckecklist.server.controller");
const verifyUser = require("../../config/auth");
//Getting All Heart Disease Checklist
router.get("/", verifyUser.verify, hdChecklist.getAllHDChecklist);
//Getting One  Heart Disease Checklist
router.get("/:id", verifyUser.verify, hdChecklist.getHDChecklistById);
//Update One  Heart Disease Checklist
router.put("/:id", verifyUser.verify, hdChecklist.updateOneHDChecklist);
//Delete One  Heart Disease Checklist
router.delete("/:id", verifyUser.verify, hdChecklist.deleteHDChecklistById);
//Create One  Heart Disease Checklist
router.post("", verifyUser.verify, hdChecklist.InsertHDChecklist);

module.exports = router;
