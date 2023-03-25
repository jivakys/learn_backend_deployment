const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    var decoded = jwt.verify(token, "masai");
    if (decoded) {
      req.body.userId = decoded.userId;
      next();
    } else {
      res.status(400).send({ msg: "Invalid token" });
    }
  } else {
    res.status(400).send({ msg: "Please Login First" });
  }
};

module.exports = { auth };
