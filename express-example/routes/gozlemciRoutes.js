const express = require("express");
const router = express.Router();
const sikayetlerModel = require("../models/sikayetlerModel");
const { authPage } = require("../middleware/auth");

router.get("/sikayet-goruntule/:gozlemciId", async (req, res) => {
  try {
    const gozlemciId = req.params.gozlemciId;

    const sikayetler = await sikayetlerModel.find({ gozlemciId: gozlemciId });
    if (sikayetler.length === 0) {
      return res
        .status(404)
        .json({ message: "Gözlemciye ait şikayet bulunamadı" });
    }
    res.status(200).json(sikayetler);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Şikayetler getirilirken bir hata oluştu" });
  }
});

router.get(
  "/oneri-goruntule/:gozlemciId",
  authPage(["gozlemci", "admin"]),
  async (req, res) => {
    res.json({ message: "gözlemciye gelen öneriler sayfası" });
  }
);

router.get("/istek-goruntule/:gozlemciId", async (req, res) => {
  res.json({ message: "gözlemciye gelen istekler sayfası" });
});

router.get("/homepage", async (req, res) => {
  res.json({ message: "gözlemci anasayfa" });
});

router.get("/profil", async (req, res) => {
  res.json({ message: "gözlemci profil sayfası" });
});

router.get("/sikayetIsterler", async (req, res) => {
  res.json({ message: "gözlemci sikayet isterler sayfası" });
});

router.get("/oneriIsterler", async (req, res) => {
  res.json({ message: "gözlemci oneri isterler sayfası" });
});

router.get("/istekIsterler", async (req, res) => {
  res.json({ message: "gözlemci istek isterler sayfası" });
});

module.exports = router;
