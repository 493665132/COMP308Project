const express = require("express");
const router = express.Router();
const dailyInfo = require("../controllers/dailyinfo.server.controller");
const verifyUser = require("../../config/auth");
//Getting All daily Info
router.get("/", verifyUser.verify, dailyInfo.getAllDailyInfo);
//Getting One daily Info
router.get("/:id", verifyUser.verify, dailyInfo.getDailyInfoById);
//Update One daily Info
router.put("/:id", verifyUser.verify, dailyInfo.updateOneDailyInfo);
//Delete One daily Info
router.delete("/:id", verifyUser.verify, dailyInfo.deleteDailyInfoById);
//Create One daily Info
router.post("", dailyInfo.InsertDailyInfo);

module.exports = router;
