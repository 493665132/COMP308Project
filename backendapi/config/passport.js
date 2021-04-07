// Load the module dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const User = require("mongoose").model("Users");
const User = require("../app/models/user.server.model");

// Create the Local strategy configuration method
module.exports = function (req, res, next) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      done(err, user);
    });
  });

  // Use the Passport's Local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      function (username, password, done) {
        console.log("username, password", username, password);
        // Use the 'User' model 'findOne' method to find a user with the current username
        User.findOne({ username: username }, (err, user) => {
          console.log("user===", user);
          // If an error occurs continue to the next middleware
          if (err) {
            console.log("err====", err);
            return done(err);
          }

          // If a user was not found, continue to the next middleware with an error message
          if (!user) {
            console.log("err1====", err);

            return done(null, false, {
              message: "Unknown user",
            });
          }

          // If the passport is incorrect, continue to the next middleware with an error message
          if (user.password != password) {
            console.log("err2====", err);

            return done(null, false, {
              message: "Invalid password",
            });
          }
          console.log("successfully Logged In");

          // Otherwise, continue to the next middleware with the user object
          return done(null, user);
        });
      }
    )
  );

  next();
};
