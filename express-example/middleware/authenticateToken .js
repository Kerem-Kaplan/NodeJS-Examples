const jwt = require("jsonwebtoken");
const User = require("../models/users/userModel.js");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  const secretKey = process.env.SECRET_KEY;
  const loginUser = User.findById(jwt.verify(token, secretKey).id);
  if (req.params.id === undefined) {
    if (!token || loginUser._conditions._id !== req.body._id)
      return res.sendStatus(401);

    next();
  } else {
    if (!token || loginUser._conditions._id !== req.params.id)
      return res.sendStatus(401);

    next();
  }
  if (token === undefined) {
    res.send("Token Yok");
  }
};

module.exports = { authenticateToken };
