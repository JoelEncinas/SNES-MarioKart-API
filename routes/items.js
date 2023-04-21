const express = require("express");
const router = express.Router();

// models
const MKItem = require("../models/MKItem");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/items", async (req, res) => {
  try {
    const items = await MKItem.find().select("-__v");
    res.status(200).json(items);
  } catch (err) {
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
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/items",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const { _id, name, description, notes } = req.body;

      const newItem = new MKItem({
        _id,
        name,
        description,
        notes,
      });

      const savedItem = await newItem.save();

      res.status(201).json({
        message: "Item created successfully",
        item: savedItem,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/items/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { _id, name, description, notes } = req.body;

      const updatedItem = new MKItem({
        _id,
        name,
        description,
        notes,
      });

      if (name) {
        updatedItem.image = `/images/${toFilename(name, false)}`;
      }

      const item = await MKItem.findByIdAndUpdate(id, updatedItem, {
        new: true,
      });
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res
        .status(200)
        .json({ message: "Item updated successfully", item: item });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/items/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const item = await MKItem.findById(id).select("-__v");
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      await MKItem.deleteOne({ _id: id });
      res
        .status(200)
        .json({ message: "Item deleted successfully", item: item });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
