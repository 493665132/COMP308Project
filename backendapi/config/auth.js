const jwt = require("jsonwebtoken");
const jwtSecret = "jsonwebtokensecret";

module.exports = {
  verify(req, res, next) {
    const token = req.headers["authorization"];
    if (token) {
      jwt.verify(token, jwtSecret, function (err, decoded) {
        if (err) {
         return res
            .status(401)
            .send({ error: err.message, message: "authentication failed" });
        } else {
          req.user_id = decoded.id;
          next();
        }
      });
    } else {
      res.status(401).send({
        error: "Authentication failed",
        message: "Please provide token",
      });
    }
  },
};
