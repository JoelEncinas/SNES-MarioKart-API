const express = require("express");
const router = express.Router();

// models
const MKItem = require("../models/MKItem");

router.get("/items", async (req, res) => {
  try {
    const items = await MKItem.find().select("-__v");
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await MKItem.findById(id).select("-__v");
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

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
      error: err._message,
    });
  }
});

module.exports = router;
