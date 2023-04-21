const mongoose = require("mongoose");

const mkNonPlayableSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  courses: {
    type: [Number]
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("MKNonPlayable", mkNonPlayableSchema);
