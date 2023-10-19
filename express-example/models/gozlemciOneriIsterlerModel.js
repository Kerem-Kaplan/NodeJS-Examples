const mongoose = require("mongoose");

const gozlemciOneritIsterler = new mongoose.Schema(
  {
    gozlemciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    isterler: {
      required: true,
      type: Object,
      oneriKonusu: {
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
  "gozlemciOneritIsterler",
  gozlemciOneritIsterler
);
