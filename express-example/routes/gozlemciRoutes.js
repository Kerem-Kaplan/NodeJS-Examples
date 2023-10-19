const express = require("express");
const router = express.Router();
const sikayetlerModel = require("../models/sikayetlerModel");
const onerilerModel = require("../models/oneriler");
const istekModel = require("../models/isteklerModel");
const { checkUserRole } = require("../middleware/checkUserRole");
const gozlemciSikayetIsterlerModel = require("../models/gozlemciSikayetIsterlerModel");
const gozlemciOneriIsterlerModel = require("../models/gozlemciOneriIsterlerModel");
const gozlemciIstekIsterlerModel = require("../models/gozlemciIstekIsterlerModel");
const database = require("../middleware/database");

router.get("/sikayet-goruntule/:id", async (req, res, next) => {
  await database.connect();
  await checkUserRole(req, res, next, "gozlemci");
  try {
    const id = req.params.id;

    const sikayetler = await sikayetlerModel.find({ gozlemciId: id });
    if (sikayetler.length === 0) {
      await database.close();
      return res
        .status(404)
        .json({ message: "Gözlemciye ait şikayet bulunamadı" });
    }
    res.status(200).json(sikayetler);
    await database.close();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Şikayetler getirilirken bir hata oluştu" });
    database.close();
  }
});

router.get("/oneri-goruntule/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;
    const oneriler = await onerilerModel.find({ gozlemciId: id });
    if (oneriler.length === 0) {
      await database.close();
      return res
        .status(404)
        .json({ message: "Gözlemciye ait oneri bulunamadı" });
    }
    res.status(200).json(oneriler);
    await database.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Oneriler getirilirken bir hata oluştu" });
    database.close();
  }
});

router.get("/istek-goruntule/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;
    const istekler = await istekModel.find({ gozlemciId: id });
    if (istekler.length === 0) {
      await database.close();
      return res
        .status(404)
        .json({ message: "Gözlemciye ait istek bulunamadı" });
    }
    res.status(200).json(istekler);
    await database.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "İstekler getirilirken bir hata oluştu" });
    database.close();
  }
});

router.get("/homepage", async (req, res) => {
  res.json({ message: "gözlemci anasayfa" });
});

router.get("/profil/:id", async (req, res) => {
  res.json({ message: "gözlemci profil sayfası" });
});

router.post("/sikayet-ister-ekle/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;

    const sikayetIsterler = await gozlemciSikayetIsterlerModel.find({
      gozlemciId: id,
    });

    if (sikayetIsterler.length === 0) {
      const isterler = req.body.isterler;
      const gozlemciId = req.params.id;
      const sikayetIsterlerModel = new gozlemciSikayetIsterlerModel({
        gozlemciId,
        isterler,
      });

      const result = await sikayetIsterlerModel.save();
      if (result) {
        await database.close();
        res.status(201).json({ message: "Şikayet ister eklendi" });
      }
    } else {
      res.send("Zaten şikayet isterler mevcut");
      await database.close();
    }
  } catch (error) {
    console.error(error);
    await database.close();
    res
      .status(500)
      .json({ message: "Şikayet ister eklenme sırasında bir hata oluştu" });
  }
});

router.post("/oneri-ister-ekle/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;

    const oneriIsterler = await gozlemciOneriIsterlerModel.find({
      gozlemciId: id,
    });

    if (oneriIsterler.length === 0) {
      const isterler = req.body.isterler;
      const gozlemciId = req.params.id;
      const oneriIsterlerModel = new gozlemciOneriIsterlerModel({
        gozlemciId,
        isterler,
      });

      const result = await oneriIsterlerModel.save();
      if (result) {
        res.status(201).json({ message: "Öneri ister eklendi" });
        await database.close();
      }
    } else {
      await database.close();
      res.send("Zaten öneri isterler mevcut");
    }
  } catch (error) {
    console.error(error);
    await database.close();
    res
      .status(500)
      .json({ message: "Oneri ister eklenme sırasında bir hata oluştu" });
  }
});

router.post("/istek-ister-ekle/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;

    const istekIsterler = await gozlemciIstekIsterlerModel.find({
      gozlemciId: id,
    });

    if (istekIsterler.length === 0) {
      const isterler = req.body.isterler;
      const gozlemciId = req.params.id;
      const istekIsterlerModel = new gozlemciIstekIsterlerModel({
        gozlemciId,
        isterler,
      });

      const result = await istekIsterlerModel.save();
      if (result) {
        await database.close();
        res.status(201).json({ message: "Istek ister eklendi" });
      }
    } else {
      await database.close();
      res.send("Zaten istek isterler mevcut");
    }
  } catch (error) {
    console.error(error);
    await database.close();
    res
      .status(500)
      .json({ message: "Istek ister eklenme sırasında bir hata oluştu" });
  }
});

router.get("/sikayetIsterler/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;

    const sikayetIsterler = await gozlemciSikayetIsterlerModel.find({
      gozlemciId: id,
    });
    if (sikayetIsterler.length === 0) {
      await database.close();
      return res
        .status(404)
        .json({ message: "Gözlemciye ait şikayet ister bulunamadı" });
    }
    res.status(200).json(sikayetIsterler);
  } catch (error) {
    await database.close();
    console.error(error);
    res
      .status(500)
      .json({ message: "Şikayetler getirilirken bir hata oluştu" });
  }
});

router.get("/oneriIsterler/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;

    const oneriIsterler = await gozlemciOneriIsterlerModel.find({
      gozlemciId: id,
    });
    if (oneriIsterler.length === 0) {
      await database.close();
      return res
        .status(404)
        .json({ message: "Gözlemciye ait öneri  ister bulunamadı" });
    }
    res.status(200).json(oneriIsterler);
  } catch (error) {
    console.error(error);
    await database.close();
    res.status(500).json({ message: "Öneriler getirilirken bir hata oluştu" });
  }
});

router.get("/istekIsterler/:id", async (req, res) => {
  await database.connect();
  try {
    const id = req.params.id;

    const istekIsterler = await gozlemciIstekIsterlerModel.find({
      gozlemciId: id,
    });
    if (istekIsterler.length === 0) {
      return res
        .status(404)
        .json({ message: "Gözlemciye ait istek  ister bulunamadı" });
    }
    res.status(200).json(istekIsterler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "İstekler getirilirken bir hata oluştu" });
  }
});

module.exports = router;
