// Load the Mongoose module and Schema object
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define a new 'UsersSchema'
const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    // Set an email index
    index: true,
    // Validate the email format
    match: /.+\@.+\..+/,
  },

  password: {
    type: String,
    // Validate the 'password' value length
    validate: [(password) => password.length >= 6, "Password Should Be Longer"],
  },

  role: {
    type: String,
    required: true,
    default: "patient",
  },
});

// Set the 'fullname' virtual property
UsersSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// Create the 'Users' model out of the 'Userschema'
const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
