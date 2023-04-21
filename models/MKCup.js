const mongoose = require("mongoose");

const mkCupSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  courses: { type: [Number], ref: "MKCourse", required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("MKCupSchema", mkCupSchema);
