const mongoose = require("mongoose");

const gozlemciIstektIsterler = new mongoose.Schema(
  {
    gozlemciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    isterler: {
      required: true,
      type: Object,
      istekKonusu: {
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
  "gozlemciIstektIsterler",
  gozlemciIstektIsterler
);
