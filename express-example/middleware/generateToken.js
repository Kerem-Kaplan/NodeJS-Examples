const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const generateToken = (id, email, sifre) => {
  const payload = { id: id, email: email, sifre: sifre };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

module.exports = { generateToken };
