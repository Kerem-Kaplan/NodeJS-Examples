const mongoose = require("mongoose");

const gozlemciSikayetIsterler = new mongoose.Schema(
  {
    gozlemciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    isterler: {
      required: true,
      type: Object,
      sikayetKonusu: {
        required: false,
        type: [String],
      },
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
