const express = require("express");
const router = express.Router();

// models
const MKNonPlayable = require("../models/MKNonPlayable");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/non-playables", async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      const nonPlayable = await MKNonPlayable.findOne({ name: name }).select(
        "-__v"
      );
      if (!nonPlayable) {
        return res.status(404).json({ error: "Non playable not found" });
      }
      res.status(200).json(nonPlayable);
    } else {
      const nonPlayables = await MKNonPlayable.find().select("-__v");
      res.status(200).json(nonPlayables);
    }
  } catch (err) {
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
      return res.status(404).json({ error: "Non playable not found" });
    }
    res.status(200).json(nonPlayable);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/non-playables",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const { _id, name, courses, description } = req.body;

      const newNonPlayable = new MKNonPlayable({
        _id,
        name,
        courses,
        description,
      });

      const savedNonPlayable = await newNonPlayable.save();

      res.status(201).json({
        message: "Non playable created successfully",
        nonPlayable: savedNonPlayable,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/non-playables/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { _id, name, courses, description } = req.body;

      const updatedNonPlayable = new MKNonPlayable({
        _id,
        name,
        courses,
        description,
      });

      if (name) {
        updatedNonPlayable.image = `${process.env.URL}/images/${toFilename(
          name,
          false
        )}`;
      }

      const nonPlayable = await MKNonPlayable.findByIdAndUpdate(
        id,
        updatedNonPlayable,
        {
          new: true,
        }
      );
      if (!nonPlayable) {
        return res.status(404).json({ error: "Non playable not found" });
      }
      res.status(200).json({
        message: "Non playable updated successfully",
        nonPlayable: nonPlayable,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/non-playables/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const nonPlayable = await MKNonPlayable.findById(id).select("-__v");
      if (!nonPlayable) {
        return res.status(404).json({ error: "Non playable not found" });
      }
      await MKNonPlayable.deleteOne({ _id: id });
      res.status(200).json({
        message: "Non playable deleted successfully",
        nonPlayable: nonPlayable,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
