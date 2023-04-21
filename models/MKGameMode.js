const mongoose = require("mongoose");

const mkGameModeSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MKGameMode", mkGameModeSchema);
