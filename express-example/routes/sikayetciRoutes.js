const express = require("express");
const sikayetciModel = require("../models/users/sikayetciModel");
const sikayetModel = require("../models/sikayetlerModel");
const router = express.Router();
const { authCourse, authPage } = require("../middleware/auth");

router.post("/sign-up", async (req, res) => {
  try {
    const sikayetci = new sikayetciModel({
      isim: req.body.isim,
      soyisim: req.body.soyisim,
      cinsiyet: req.body.cinsiyet,
      dogumTarihi: req.body.dogumTarihi,
      uyruk: req.body.uyruk,
      tcveyapasaport: req.body.tcveyapasaport,
      email: req.body.email,
      sifre: req.body.sifre,
      telefonNo: req.body.telefonNo,
      rol: req.body.rol,
    });

    await sikayetci.save();
    res.status(201).json({ message: "Şikayetçi başarıyla kaydedildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
  }
});

router.post("/sikayet-gonder", async (req, res) => {
  try {
    const { sikayetciId, gozlemciId, sikayetIcerigi } = req.body;
    const sikayet = new sikayetModel({
      gozlemciId,
      sikayetciId,
      sikayetIcerigi,
    });

    await sikayet.save();
    res.status(201).json({ message: "Şikayet başarıyla gönderildi" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Şikayet gönderme sırasında bir hata oluştu" });
  }
});

router.post("/oneri-gonder", async (req, res) => {
  res.json({ message: "sikayetci oneri gönderme sayfası" });
});

router.post("/istek-gonder", async (req, res) => {
  res.json({ message: "sikayetci istek gönderme sayfası" });
});

router.get("/profil", async (req, res) => {
  res.json({ message: "sikayetci profil sayfası" });
});

router.get("/gecmis-sikayet/:sikayetciId", authPage(["şikayetçi"]),async (req, res) => {
  res.json({ message: "sikayetci gecmis sikayet sayfası" });
});

router.get("/gecmis-istek/:sikayetciId", async (req, res) => {
  res.json({ message: "sikayetci gecmis istek sayfası" });
});

router.get("/gecmis-oneri/:sikayetciId", async (req, res) => {
  res.json({ message: "sikayetci gecmis oneri sayfası" });
});

module.exports = router;
