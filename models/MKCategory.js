const mongoose = require("mongoose");

const mkCategorySchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  speed: { type: String, required: true },
});

module.exports = mongoose.model("MKCategory", mkCategorySchema);
