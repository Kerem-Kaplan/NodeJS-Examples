const express = require("express");
const sikayetciModel = require("../models/users/sikayetciModel");
const sikayetModel = require("../models/sikayetlerModel");
const router = express.Router();
const { authUser, checkUserRole } = require("../middleware/checkUserRole");
const hashPassword = require("../middleware/hashPassword");
const bcrypt = require("bcrypt");
const mernisDogrula = require("../middleware/mernis");
const database = require("../middleware/database");
const oneriler = require("../models/oneriler");
const isteklerModel = require("../models/isteklerModel");
const oylar = require("../models/oylar");

router.post("/sign-up", async (req, res) => {
  try {
    await mernisDogrula(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
    database.close();
  }
});

router.post("/sikayet-gonder", async (req, res) => {
  await database.connect();
  try {
    const { sikayetciId, gozlemciId, sikayetIcerigi, oy } = req.body;
    const sikayet = new sikayetModel({
      gozlemciId,
      sikayetciId,
      oy,
      sikayetIcerigi,
    });

    const oyMiktari = new oylar({
      gozlemciId,
      sikayetciId,
      oy,
    });
    await oyMiktari.save();
    await sikayet.save();
    res.status(201).json({ message: "Şikayet başarıyla gönderildi" });
    await database.close();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Şikayet gönderme sırasında bir hata oluştu" });
    await database.close();
  }
});

router.post("/oneri-gonder", async (req, res) => {
  await database.connect();
  try {
    const { sikayetciId, gozlemciId, oneriIcerigi } = req.body;
    const oneri = new oneriler({
      gozlemciId,
      sikayetciId,
      oneriIcerigi,
    });

    await oneri.save();
    res.status(201).json({ message: "Oneri başarıyla gönderildi" });
    await database.close();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Oneri gönderme sırasında bir hata oluştu" });
    await database.close();
  }
});

router.post("/istek-gonder", async (req, res) => {
  await database.connect();
  try {
    const { sikayetciId, gozlemciId, istekIcerigi } = req.body;
    const istek = new isteklerModel({
      gozlemciId,
      sikayetciId,
      istekIcerigi,
    });

    await istek.save();
    res.status(201).json({ message: "Istek başarıyla gönderildi" });
    await database.close();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Istek gönderme sırasında bir hata oluştu" });
    await database.close();
  }
});

router.get("/profil", async (req, res) => {
  res.json({ message: "sikayetci profil sayfası" });
});

router.get("/gecmis-sikayet/:id", async (req, res, next) => {
  await database.connect();
  await checkUserRole(req, res, next, "şikayetçi");
  try {
    const id = req.params.id;
    const sikayetler = await sikayetModel.find({ sikayetciId: id });
    if (sikayetler.length === 0) {
      await database.close();
      return res
        .status(404)
        .json({ message: "Şikayetciye ait şikayet bulunamadı" });
    }
    res.status(200).json(sikayetler);
    await database.close();
  } catch (error) {
    //console.error(error);
    res
      .status(500)
      .json({ message: "Şikayetler getirilirken bir hata oluştu" });
    database.close();
  }
});

router.get("/gecmis-istek/:id", async (req, res, next) => {
  await database.connect();
  await checkUserRole(req, res, next, "şikayetçi");
  try {
    const id = req.params.id;
    const istekler = await isteklerModel.find({ sikayetciId: id });
    console.log(istekler);
    if (istekler.length === 0) {
      await database.close();
      res.status(404).json("Şikayetciye ait istek bulunamadı");
    } else {
      res.status(200).json(istekler);
      await database.close();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "İstekler getirilirken bir hata oluştu" });
    await database.close();
  }
});

router.get("/gecmis-oneri/:id", async (req, res) => {
  await database.connect();
  await checkUserRole(req, res, next, "şikayetçi");
  try {
    const id = req.params.id;
    const oneri = await oneriler.find({ sikayetciId: id });
    if (oneri.length === 0) {
      await database.close();
      return res
        .status(404)
        .json({ message: "Şikayetciye ait oneri bulunamadı" });
    }
    res.status(200).json(oneri);
    await database.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Oneriler getirilirken bir hata oluştu" });
    database.close();
  }
});

module.exports = router;
