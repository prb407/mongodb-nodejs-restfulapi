const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const Router = require("express").Router();

Router.post("/", async (req, res) => {
  const ifExists = await UserModel.findOne({ email: req.body.email });
  if (ifExists) {
    return res
      .status(200)
      .send({ status: false, message: "User exists with provided email" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  if (!hashedPassword) {
    return res.status(200).send({
      status: false,
      message: "Internal server error",
      details: "occured while password storing"
    });
  }

  const newUser = UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    verified: true
  });
  const newCreatedUser = await newUser.save();
  if (!newCreatedUser) {
    return res.status(200).send({
      status: false,
      message: "Internal server error",
      details: "occured while user registration"
    });
  }
  return res.status(200).send({
    status: true,
    message: "User registred with " + req.body.email,
    data: newUser
  });
});

module.exports = Router;
