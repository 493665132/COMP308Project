//const User = require("mongoose").model("Users");
const User = require("../models/user.server.model");

//Add new user
exports.CreateUser = async (req, res, next) => {
  console.log("add new user called", req.body);
  //Create a new instance of the 'User' Mongoose model
  let user = new User(req.body);
  await user
    .save()
    .then((response) => {
      res.status(200).send({
        message: "User has been created successfully",
        result: response,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).send({ message: error.message });
    });
};

//Get all Users
exports.getAllUsers = async (req, res) => {
  await User.find()
    .then((users) => {
      res
        .status(200)
        .send({ message: "All Users fetched successfully", result: users });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Get one user by id
exports.getUserById = async (req, res) => {
  console.log("getUserById", req.params.id);
  // Use the 'User' static 'findById' method to retrieve a specific user by Id
  await User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "user not found", result: user });
      } else {
        res
          .status(200)
          .send({ message: "user fetched successfully", result: user });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Update one User by id
exports.updateOneUser = async (req, res, next) => {
  console.log("inside update", req.body);
  await User.findByIdAndUpdate(req.params.id, req.body)
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      } else {
        const updatedUser = await User.findById(user._id);
        console.log("updated user -->", updatedUser);
        res.status(200).send({
          message: "User updated successfully",
          result: updatedUser,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

//Delete user by id
exports.deleteUserById = async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

exports.saveUserDBCall = (body) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username: body.username }).then((result) => {
      if (result) {
        reject("User Name Exist");
      } else {
        var user = new User(body);
        user
          .save()
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  });
};
