const mongoose = require("mongoose");

const gozlemciSikayetIsterler = new mongoose.Schema(
  {
    gozlemciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    oyMiktarı: {
      required: true,
      type: Number,
    },
    sikayetKonusu: {
      required: false,
      type: [String],
    },
    isterler: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model(
  "gozlemciSikayetIsterler",
  gozlemciSikayetIsterler
);
