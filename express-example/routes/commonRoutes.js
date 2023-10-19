const express = require("express");
const router = express.Router();
const gozlemciModel = require("../models/users/gozlemciModel");
const sikayetciModel = require("../models/users/sikayetciModel");
const bcrypt = require("bcrypt");
const database = require("../middleware/database");

router.post("/login", async (req, res) => {
  const { email, sifre } = req.body;
  await database.connect();
  try {
    const sikayetciUser = await sikayetciModel.findOne({ email });
    const gozlemciUser = await gozlemciModel.findOne({ email });

    if (!sikayetciUser && !gozlemciUser) {
      return res.status(401).json({ message: "kullanıcı bulunamadı" });
    }
    if (gozlemciUser) {
      if (gozlemciUser.sifre !== sifre) {
        return res.status(401).json({ message: "gozlemci parola hatalı" });
      }
      res.status(200).json({ message: "gozlemci Giris basarili" });
    }
    if (sikayetciUser) {
      bcrypt.compare(sifre, sikayetciUser.sifre, (err, result) => {
        if (err) {
          res.send("Karşılaştırma hatası", err);
        } else {
          if (result) {
            res.status(200).json({ message: "sikayetci Giris basarili" });
          } else {
            res.send("Yanlış Şifre");
          }
        }
      });
    }
    database.close();
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu" });
    database.close();
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
