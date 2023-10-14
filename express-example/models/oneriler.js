const mongoose = require("mongoose");

const oneriler = new mongoose.Schema(
  {
    sikayetciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    gozlemciId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    oneriIcerigi: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("oneriler", oneriler);
