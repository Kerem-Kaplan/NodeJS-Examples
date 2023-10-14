const express = require("express");
const router = express.Router();
const gozlemciModel = require("../models/users/gozlemciModel");
const sikayetciModel = require("../models/users/sikayetciModel");

router.post("/login", async (req, res) => {
  const { email, sifre } = req.body;

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
      if (sikayetciUser.sifre !== sifre) {
        return res.status(401).json({ message: "sikayetci parola hatalı" });
      }
      res.status(200).json({ message: "sikayetci Giris basarili" });
    }
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu" });
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
