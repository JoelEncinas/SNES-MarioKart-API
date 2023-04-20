const mongoose = require("mongoose");

const mkItemSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model("MKItem", mkItemSchema);
