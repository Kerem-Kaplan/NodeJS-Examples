const bcrypt = require("bcrypt");
const saltRounds = 10; // Salt tur sayısı

const hashPassword = (password) => {
  bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log("hashleme hatası", err);
    }
    console.log("Hashlenmiş sifre", hash);
    hashedPassword = hash;
  });
  return hashedPassword;
};

module.exports = hashPassword;
