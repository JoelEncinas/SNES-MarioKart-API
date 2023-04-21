const mongoose = require("mongoose");

const mkCourseSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  terrain: {
    type: String,
    required: true,
  },
  slipperiness: {
    type: String,
    required: true,
  },
  obstacles: {
    type: [String],
    required: true,
  },
  character: { type: Number, ref: "MKCharacter", required: true },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MKCourse", mkCourseSchema);
