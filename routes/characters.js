const express = require("express");
const router = express.Router();

// models
const MKCharacter = require("../models/MKCharacter");

router.get("/characters", async (req, res) => {
  try {
    const characters = await MKCharacter.find().select("-__v");
    res.status(200).json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const character = await MKCharacter.findById(id).select("-__v");
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.status(200).json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

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
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.delete("/characters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const character = await MKCharacter.findById(id).select("-__v");
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    await MKCharacter.deleteOne({ _id: id });
    res
      .status(200)
      .json({
        message: "Character deleted successfully",
        character: character,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
