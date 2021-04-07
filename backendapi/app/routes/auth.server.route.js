const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.server.controller");


router.post("/login", auth.loginUser);
router.post("/register", auth.registerUser);
router.get("/logout", auth.logout);

module.exports = router;
