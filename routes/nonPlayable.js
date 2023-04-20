const express = require("express");
const router = express.Router();

// models
const MKNonPlayable = require("../models/MKNonPlayable");

router.get("/non-playables", async (req, res) => {
  try {
    const nonPlayables = await MKNonPlayable.find().select("-__v");
    res.status(200).json(nonPlayables);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/non-playables/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const nonPlayable = await MKNonPlayable.findById(id).select("-__v");
    if (!nonPlayable) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(nonPlayable);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/non-playables", async (req, res) => {
  try {
    const { _id, name, location, description } = req.body;

    const newNonPlayable = new MKNonPlayable({
      _id,
      name,
      location,
      description,
    });

    const savedNonPlayable = await newNonPlayable.save();

    res.status(201).json(savedNonPlayable);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
