const express = require("express");
const router = express.Router();

// models
const MKRival = require("../models/MKRival");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/rivals", async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const rival = await MKRival.findOne({ character: id }).select("-__v");
      if (!rival) {
        return res.status(404).json({ error: "Character not found" });
      }
      res.status(200).json(rival);
    } else {
      const rivals = await MKRival.find().select("-__v");
      res.status(200).json(rivals);
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/rivals/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rival = await MKRival.findById(id).select("-__v");
    if (!rival) {
      return res.status(404).json({ error: "Rival not found" });
    }
    res.status(200).json(rival);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/rivals",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const { _id, character, veryFast, fast, medium, slow, verySlow } =
        req.body;

      const newRival = new MKRival({
        _id,
        character,
        veryFast,
        fast,
        medium,
        slow,
        verySlow,
      });

      const savedRival = await newRival.save();

      res.status(201).json({
        message: "Rival created successfully",
        rival: savedRival,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/rivals/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { _id, character, veryFast, fast, medium, slow, verySlow } =
        req.body;

      const updatedRival = new MKRival({
        _id,
        character,
        veryFast,
        fast,
        medium,
        slow,
        verySlow,
      });

      const rival = await MKRival.findByIdAndUpdate(id, updatedRival, {
        new: true,
      });
      if (!rival) {
        return res.status(404).json({ error: "Rival not found" });
      }
      res.status(200).json({
        message: "Rival updated successfully",
        rival: rival,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/rivals/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const rival = await MKRival.findById(id).select("-__v");
      if (!rival) {
        return res.status(404).json({ error: "Rival not found" });
      }
      await MKRival.deleteOne({ _id: id });
      res.status(200).json({
        message: "Rival deleted successfully",
        rival: rival,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
