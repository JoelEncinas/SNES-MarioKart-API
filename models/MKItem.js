const mongoose = require("mongoose");
const toFilename = require("../utils/toFileName");

const mkItemSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: String, required: true },
  image: {
    type: String,
  },
});

mkItemSchema.pre("save", function (next) {
  const filename = toFilename(this.name, false);

  this.image = `https://snes-smk.onrender.com/api/images/${filename}`;
  next();
});

module.exports = mongoose.model("MKItem", mkItemSchema);
