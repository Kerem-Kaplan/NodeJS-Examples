const mongoose = require("mongoose");

const kurumKategoriSchema = new mongoose.Schema(
  {
    kategoriAdi: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("kurumKategori", kurumKategoriSchema);
