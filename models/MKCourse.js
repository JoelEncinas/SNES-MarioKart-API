const mongoose = require("mongoose");
const toFilename = require("../utils/toFileName");

const mkCourseSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  cup: { type: Number, ref: "MKCup" },
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
  },
  character: { type: Number, ref: "MKCharacter" },
  image: {
    type: String,
  },
});

mkCourseSchema.pre("save", function (next) {
  const filename = toFilename(this.name, false);

  this.image = `${process.env.URL}/${filename}`;
  next();
});

module.exports = mongoose.model("MKCourse", mkCourseSchema);
