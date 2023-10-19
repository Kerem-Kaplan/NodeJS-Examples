const mongoose = require("mongoose");

const istekler = new mongoose.Schema(
  {
    sikayetciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    gozlemciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    istekIcerigi: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("istekler", istekler);
