const express = require("express");
const router = express.Router();

// models
const MKItem = require("../models/MKItem");

router.post("/items", async (req, res) => {
  try {
    const { _id, name, description, notes } = req.body;

    const newItem = new MKItem({
      _id,
      name,
      description,
      notes,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
