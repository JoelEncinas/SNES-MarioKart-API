const express = require("express");
const router = express.Router();

// models
const MKCharacter = require("../models/MKCharacter");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/characters", async (req, res) => {
  try {
    const characters = await MKCharacter.find().select("-__v");
    res.status(200).json(characters);
  } catch (err) {
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
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/characters",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
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

      res.status(201).json({
        message: "Character created successfully",
        character: savedCharacter,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/characters/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { _id, name, category, stats, cpuItem } = req.body;

      const updatedCharacter = new MKCharacter({
        _id,
        name,
        category,
        stats,
        cpuItem,
      });

      if (name) {
        updatedCharacter.animatedImage = `/images/${toFilename(name, true)}`;
      }

      const character = await MKCharacter.findByIdAndUpdate(
        id,
        updatedCharacter,
        {
          new: true,
        }
      );
      if (!character) {
        return res.status(404).json({ error: "Character not found" });
      }
      res.status(200).json({
        message: "Character updated successfully",
        character: character,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/characters/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const character = await MKCharacter.findById(id).select("-__v");
      if (!character) {
        return res.status(404).json({ error: "Character not found" });
      }
      await MKCharacter.deleteOne({ _id: id });
      res.status(200).json({
        message: "Character deleted successfully",
        character: character,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
