const mongoose = require("mongoose");

const sikayetler = new mongoose.Schema(
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
    sikayetIcerigi: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("sikayetler", sikayetler);
