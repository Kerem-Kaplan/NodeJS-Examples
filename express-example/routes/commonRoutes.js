const express = require("express");
const router = express.Router();
const User = require("../models/users/userModel");
const bcrypt = require("bcrypt");
const database = require("../middleware/database");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middleware/generateToken");

router.post("/login", async (req, res) => {
  const { email, sifre } = req.body;
  await database.connect();
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(sifre, user.sifre, (err, result) => {
        if (err) {
          res.send("Karşılaştırma hatası", err);
        } else {
          if (result) {
            const token = generateToken(user._id, user.email, user.sifre);
            res
              .status(200)
              .json({ message: "kullanıcı Giris basarili", token: token });

            console.log(token);
          } else {
            return res.status(401).json({ message: "kullanıcı parola hatalı" });
          }
        }
      });
    } else {
      return res.status(401).json({ message: "kullanıcı bulunamadı" });
    }
    await database.close();
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu" });
    await database.close();
  }

  /*  try {
    const gozlemciUser = await gozlemciModel.findOne({ email });

    if (!gozlemciUser) {
      return res.status(401).json({ message: "gozlemci bulunamadı" });
    }

    if (gozlemciUser.password !== sifre) {
      return res.status(401).json({ message: "parola hatalı" });
    }

    res.status(200).json({ message: "Giris basarili" });
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu" });
  } */
});

module.exports = router;
