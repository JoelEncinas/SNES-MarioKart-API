const mongoose = require("mongoose");
const toFilename = require("../utils/toFileName");

const mkNonPlayableSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  courses: {
    type: [Number],
    ref: "MKCourse",
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

mkNonPlayableSchema.pre("save", function (next) {
  const filename = toFilename(this.name, false);

  this.image = `${process.env.URL}/${filename}`;
  next();
});

module.exports = mongoose.model("MKNonPlayable", mkNonPlayableSchema);
