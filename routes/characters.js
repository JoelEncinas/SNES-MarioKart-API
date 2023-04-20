const express = require("express");
const router = express.Router();

// models
const MKCharacter = require("../models/MKCharacter");

router.post("/characters", async (req, res) => {
  try {
    const { _id, name, category, stats, cpuItem } = req.body;

    const newCharacter = new MKCharacter({
      _id,
      name,
      category,
      stats,
      cpuItem,
    });

    const savedCharacter = await newCharacter.save();

    res.status(201).json(savedCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
