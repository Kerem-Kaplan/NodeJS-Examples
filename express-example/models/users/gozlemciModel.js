const mongoose = require("mongoose");

const gozlemciSchema = new mongoose.Schema(
  {
    kurumAdi: {
      required: true,
      type: String,
    },
    iletisimBilgileri: {
      required: true,
      type: Object,
      telefonNo: {
        required: true,
        type: String,
      },
      emailIletisim: {
        required: true,
        type: String,
      },
    },
    email: {
      required: true,
      type: String,
    },
    sifre: {
      required: true,
      type: String,
    },
    kurumKategori: {
      required: false,
      type: mongoose.Types.ObjectId,
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

module.exports = mongoose.model("gozlemci", gozlemciSchema);
