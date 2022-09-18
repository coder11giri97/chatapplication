const jwt = require("jsonwebtoken");
const User = require("./models/user");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("authorization");

    const Id = jwt.verify(token, "giri");
    console.log(Id);
    User.findByPk(Id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(401).json({ message: "unauthorized login again" });
      });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "not able to authorize! login again" });
  }
};