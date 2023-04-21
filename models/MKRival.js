const mongoose = require("mongoose");

const mkRivalSchema = new mongoose.Schema({
  character: { type: Number, ref: "MKCharacter", required: true },
  veryFast: { type: Number, ref: "MKCharacter", required: true },
  fast: { type: Number, ref: "MKCharacter", required: true },
  medium: { type: Number, ref: "MKCharacter", required: true },
  slow: { type: Number, ref: "MKCharacter", required: true },
  verySlow: { type: [Number], ref: "MKCharacter", required: true },
});

module.exports = mongoose.model("MKRivalSchema", mkRivalSchema);
