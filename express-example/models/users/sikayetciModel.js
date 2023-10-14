const mongoose = require("mongoose");

const sikayetciSchema = new mongoose.Schema(
  {
    isim: {
      required: true,
      type: String,
    },
    soyisim: {
      required: true,
      type: String,
    },
    cinsiyet: {
      required: true,
      type: String,
    },
    dogumTarihi: {
      required: true,
      type: String,
    },
    uyruk: {
      required: true,
      type: String,
    },
    tcveyapasaport: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    sifre: {
      required: true,
      type: String,
    },
    telefonNo: {
      required: true,
      type: String,
    },
    rol: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("sikayetci", sikayetciSchema);