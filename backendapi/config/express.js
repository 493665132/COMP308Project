//express.js file is where we configure our Express application
//
// Load the module dependencies
const express = require("express");
//const studentRoutes = require("../app/routes/user.server.route");
const passport = require("passport");
//const passport_middleware = require("./passport");

var config = require("./config"),
  // express = require("express"),
  morgan = require("morgan"),
  compress = require("compression"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  session = require("express-session"),
  cors = require("cors");

// Create a new Express application instance
module.exports = function () {
  //Create the Express application object
  var app = express();

  var mongoose = require("../config/mongoose");
  var db = mongoose();
  //the process.env property allows you to access predefined environment variables
  //such as NODE_ENV
  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }
  app.use(cors());
  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json()); //use middleware that only parses json
  app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  //override with POST having ?_method=DELETE or ?_method=PUT in HTML code
  app.use(methodOverride("_method"));

  //saveUninitialized - forces a session that is "uninitialized" to be saved to the store
  //resave - forces the session to be saved back to the session store
  // Configure the 'session' middleware
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(passport_middleware);
 
  return app;
};
