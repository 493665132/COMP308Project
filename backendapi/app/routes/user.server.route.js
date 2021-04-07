const express = require("express");
const router = express.Router();
const user = require("../controllers/user.server.controller");
const verifyUser = require("../../config/auth");
//Getting All Users
router.get("/", verifyUser.verify, user.getAllUsers);
//Getting One User
router.get("/:id", verifyUser.verify, user.getUserById);
//Update One User
router.put("/:id", verifyUser.verify, user.updateOneUser);
//Delete One User
router.delete("/:id", verifyUser.verify, user.deleteUserById);
//Create One User
router.post("", user.CreateUser);

module.exports = router;
