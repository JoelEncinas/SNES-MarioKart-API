const mongoose = require("mongoose");

const mkNonPlayableSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  courses: {
    type: [Number],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MKNonPlayable", mkNonPlayableSchema);
