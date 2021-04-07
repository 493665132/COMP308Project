const User = require("../models/user.server.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = "jsonwebtokensecret";
const jwtExpirySeconds = 3600; // One hour use of token before it expires
const { saveUserDBCall } = require("../controllers/user.server.controller.js");

exports.loginUser = (req, res, next) => {
  console.log("inside login call", jwtSecret);
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(400).send({ mesaage: "something went wrong" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) return res.status(500).send({ mesaage: err.message });
    });

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpirySeconds,
    });
    res
      .status(200)
      .send({ token: token, message: "User Logged in Successfully" });
  })(req, res);
};

//delete the token on the client side by clearing the cookie named 'token'
exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({ message: "Logged out" });
};

exports.registerUser = async (req, res, next) => {
  try {
    const user = await saveUserDBCall(req.body);
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpirySeconds,
    });
    res.status(200).send({
      message: "User registered Successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).send({ mesaage: error.message });
  }
};
