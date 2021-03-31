// Load the module dependencies
const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  username: {
    type: String,
    // Set a unique 'username' index
    unique: true,
    // Validate 'username' value existance
    required: "Username is required",
    // Trim the 'username' field
    trim: true,
  },
  password: {
    type: String,
    // Validate the 'password' value length
    validate: [
      (password) => password && password.length > 6,
      "Password should be longer",
    ],
  },
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model("User", UserSchema);
