const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Router = require("express").Router();

Router.post("/", async (req, res) => {
  const ifExists = await UserModel.findOne({ email: req.body.email });
  if (!ifExists) {
    return res.status(403).send({
      status: false,
      message: "User not found with given credentials"
    });
  }

  const user = ifExists;
  const isPasswordVerified = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordVerified) {
    return res
      .status(403)
      .send({ status: false, message: "Unauthorized access" });
  }

  const token = jwt.sign(
    {
      email: user.email,
      _id: user._id
    },
    "asdasdasdsadadsad"
  );

  if (!token) {
    return res.status(500).send({
      status: false,
      message: "internal server error",
      details: "occured while generating unique token for user",
      tips: "try after sometime"
    });
  }

  res.status(200).send({
    status: true,
    token: token,
    email: user.email
  });
});

module.exports = Router;
