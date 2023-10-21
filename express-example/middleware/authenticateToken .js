const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization: Bearer")
  console.log("token", token);
  if (!token) return res.sendStatus(401);
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
