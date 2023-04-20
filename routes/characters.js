const express = require("express");
const router = express.Router();
const MKCharacter = require("../models/MKCharacter");

router.get("/characters", async (req, res) => {
  res.status(200).json("hi");
});

router.post("/characters", async (req, res) => {
  try {
    const { name, category, stats, cpuItem } = req.body;

    // Create a new character document using the MKCharacter model
    const newCharacter = new MKCharacter({
      name,
      category,
      stats,
      cpuItem,
    });

    // Save the new character document to the database
    const savedCharacter = await newCharacter.save();

    // Return the saved character document in the response
    res.status(201).json(savedCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
