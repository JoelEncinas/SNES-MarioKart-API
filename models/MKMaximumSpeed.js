const mongoose = require("mongoose");

const mkMaximumSpeedSchema = new mongoose.Schema({
  character: { type: Number, ref: "MKCharacter", required: true },
  normalRoad: {
    type: Number,
    required: true,
  },
  circuitSand: {
    type: Number,
    required: true,
  },
  chocoIslandRocks: {
    type: Number,
    required: true,
  },
  chocoIslandMud: {
    type: Number,
    required: true,
  },
  donutPlainsGrass: {
    type: Number,
    required: true,
  },
  koopaBeachWater: {
    type: Number,
    required: true,
  },
  vanillaLakeSnow: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("MKMaximumSpeedSchema", mkMaximumSpeedSchema);
