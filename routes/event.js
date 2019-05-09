const UserModel = require("../models/user");
const EventModel = require("../models/event");
const bcrypt = require("bcrypt");

const Router = require("express").Router();

Router.post("/", async (req, res) => {
  try {
    if (!req.isAuth) {
      return res
        .status(403)
        .send({ status: false, message: "Unauthorized access" });
    }
    res.send({
      status: true
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "internal server error while creating event"
    });
  }
});

module.exports = Router;
