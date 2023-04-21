const express = require("express");
const router = express.Router();

// models
const MKMaximumSpeed = require("../models/MKMaximumSpeed");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/maximum-speeds", async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const maximumSpeed = await MKMaximumSpeed.findOne({ character: id }).select(
        "-__v"
      );
      if (!maximumSpeed) {
        return res.status(404).json({ error: "Character not found" });
      }
      res.status(200).json(maximumSpeed);
    } else {
      const maximumSpeeds = await MKMaximumSpeed.find().select("-__v");
      res.status(200).json(maximumSpeeds);
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/maximum-speeds/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const maximumSpeed = await MKMaximumSpeed.findById(id).select("-__v");
    if (!maximumSpeed) {
      return res.status(404).json({ error: "Maximum speed not found" });
    }
    res.status(200).json(maximumSpeed);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/maximum-speeds",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const {
        _id,
        character,
        normalRoad,
        circuitSand,
        chocoIslandRocks,
        chocoIslandMud,
        donutPlainsGrass,
        koopaBeachWater,
        vanillaLakeSnow,
      } = req.body;

      const newMaximumSpeed = new MKMaximumSpeed({
        _id,
        character,
        normalRoad,
        circuitSand,
        chocoIslandRocks,
        chocoIslandMud,
        donutPlainsGrass,
        koopaBeachWater,
        vanillaLakeSnow,
      });

      const savedMaximumSpeed = await newMaximumSpeed.save();

      res.status(201).json({
        message: "Maximum speed created successfully",
        maximumSpeed: savedMaximumSpeed,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/maximumSpeeds/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const {
        _id,
        character,
        normalRoad,
        circuitSand,
        chocoIslandRocks,
        chocoIslandMud,
        donutPlainsGrass,
        koopaBeachWater,
        vanillaLakeSnow,
      } = req.body;

      const updatedMaximumSpeed = new MKMaximumSpeed({
        _id,
        character,
        normalRoad,
        circuitSand,
        chocoIslandRocks,
        chocoIslandMud,
        donutPlainsGrass,
        koopaBeachWater,
        vanillaLakeSnow,
      });

      const maximumSpeed = await MKMaximumSpeed.findByIdAndUpdate(
        id,
        updatedMaximumSpeed,
        {
          new: true,
        }
      );
      if (!maximumSpeed) {
        return res.status(404).json({ error: "Maximum speed not found" });
      }
      res.status(200).json({
        message: "Maximum speed updated successfully",
        maximumSpeed: maximumSpeed,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/maximumSpeeds/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const maximumSpeed = await MKMaximumSpeed.findById(id).select("-__v");
      if (!maximumSpeed) {
        return res.status(404).json({ error: "Maximum speed not found" });
      }
      await MKMaximumSpeed.deleteOne({ _id: id });
      res.status(200).json({
        message: "Maximum speed deleted successfully",
        maximumSpeed: maximumSpeed,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
