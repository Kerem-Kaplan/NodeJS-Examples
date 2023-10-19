const mongoose = require("mongoose");

const oylar = new mongoose.Schema(
  {
    sikayetciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    gozlemciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    oy: {
      required: true,
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);
module.exports = mongoose.model("oylar", oylar);
