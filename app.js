const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const multer = require("multer");
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "/my-uploads");
//   },
//   filename: function(req, file, cb) {
//     console.log("asdasdsada", req.file);
//     cb(null, file.fieldname + "-" + Date.now());
//   }
// });

var upload = multer({ dest: "uploads/" }).single("file");

const app = express();

app.use(bodyParser.json());

app.use(auth);

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/event", require("./routes/event"));

app.post("/multer", async (req, res) => {
  upload(req, res, function(err) {
    if (req.file) {
      console.log(req.file);
    }
    console.log(req.file.originalname);
    // Everything went fine.
  });
});

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
