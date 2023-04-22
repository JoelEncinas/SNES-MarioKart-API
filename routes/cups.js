const express = require("express");
const router = express.Router();

// models
const MKCup = require("../models/MKCup");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

// utils
const toFilename = require("../utils/toFileName");

router.get("/cups", async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      const cup = await MKCup.findOne({ name: name }).select("-__v");
      if (!cup) {
        return res.status(404).json({ error: "Cup not found" });
      }
      res.status(200).json(cup);
    } else {
      const cups = await MKCup.find().select("-__v");
      res.status(200).json(cups);
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/cups/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cup = await MKCup.findById(id).select("-__v");
    if (!cup) {
      return res.status(404).json({ error: "Cup not found" });
    }
    res.status(200).json(cup);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/cups",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const { _id, name, courses } = req.body;

      const newCup = new MKCup({
        _id,
        name,
        courses,
      });

      const savedCup = await newCup.save();

      res.status(201).json({
        message: "Cup created successfully",
        cup: savedCup,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/cups/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { _id, name, courses } = req.body;

      const updatedCup = new MKCup({
        _id,
        name,
        courses,
      });

      if (name) {
        updatedCup.image = `${process.env.URL}/images/${toFilename(
          name,
          false
        )}`;
      }

      const cup = await MKCup.findByIdAndUpdate(id, updatedCup, {
        new: true,
      });
      if (!cup) {
        return res.status(404).json({ error: "Cup not found" });
      }
      res.status(200).json({
        message: "Cup updated successfully",
        cup: cup,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/cups/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const cup = await MKCup.findById(id).select("-__v");
      if (!cup) {
        return res.status(404).json({ error: "Cup not found" });
      }
      await MKCup.deleteOne({ _id: id });
      res.status(200).json({
        message: "Cup deleted successfully",
        cup: cup,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
