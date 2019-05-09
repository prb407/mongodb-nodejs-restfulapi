const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");

const app = express();

app.use(bodyParser.json());

app.use(auth);

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/event", require("./routes/event"));

mongoose
  .connect("mongodb://127.0.0.1:27017/mongodbdemo", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("node server on 3000");
});
