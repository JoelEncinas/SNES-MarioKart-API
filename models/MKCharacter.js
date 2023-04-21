const mongoose = require("mongoose");
const toFilename = require("../utils/toFileName");

const mkCharacterSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  stats: {
    acceleration: { type: Number, required: true },
    topSpeed: { type: Number, required: true },
    weight: { type: Number, required: true },
    handling: { type: Number, required: true },
  },
  cpuItem: { type: Number, ref: "MKItem", required: true },
  animatedImage: {
    type: String,
  },
});

mkCharacterSchema.pre("save", function (next) {
  const filename = toFilename(this.name, true);

  this.animatedImage = `/images/${filename}`;
  next();
});

module.exports = mongoose.model("MKCharacter", mkCharacterSchema);
