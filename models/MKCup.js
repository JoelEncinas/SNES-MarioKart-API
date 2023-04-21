const mongoose = require("mongoose");
const toFilename = require("../utils/toFileName");

const mkCupSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  courses: { type: [Number], ref: "MKCourse", required: true },
  image: { type: String },
});

mkCupSchema.pre("save", function (next) {
  const filename = toFilename(this.name, false);

  this.image = `/images/${filename}`;
  next();
});

module.exports = mongoose.model("MKCup", mkCupSchema);
