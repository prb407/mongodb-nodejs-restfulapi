const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  var isAuthorizaed;
  try {
    isAuthorizaed = jwt.verify(token, "asdasdasdsadadsad");
  } catch (error) {
    if (!isAuthorizaed) {
      req.isAuth = false;
    }
    return next();
  }

  req.isAuth = true;
  req.userID = isAuthorizaed._id;
  console.log(req.isAuth);
  next();
};
