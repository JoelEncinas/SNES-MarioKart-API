const express = require("express");
const router = express.Router();

// models
const MKGameMode = require("../models/MKGameMode");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/game-modes", async (req, res) => {
  try {
    const gameModes = await MKGameMode.find().select("-__v");
    res.status(200).json(gameModes);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/game-modes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const gameMode = await MKGameMode.findById(id).select("-__v");
    if (!gameMode) {
      return res.status(404).json({ error: "Game mode not found" });
    }
    res.status(200).json(gameMode);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/game-modes",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const { _id, name, description } = req.body;

      const newGameMode = new MKGameMode({
        _id,
        name,
        description,
      });

      const savedGameMode = await newGameMode.save();

      res.status(201).json({
        message: "Game mode created successfully",
        gameMode: savedGameMode,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/game-modes/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { _id, name, description } = req.body;

      const updatedGameMode = new MKGameMode({
        _id, name, description
      });

      const gameMode = await MKGameMode.findByIdAndUpdate(id, updatedGameMode, {
        new: true,
      });
      if (!gameMode) {
        return res.status(404).json({ error: "Game mode not found" });
      }
      res.status(200).json({
        message: "Game mode updated successfully",
        gameMode: gameMode,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/game-modes/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const gameMode = await MKGameMode.findById(id).select("-__v");
      if (!gameMode) {
        return res.status(404).json({ error: "Game mode not found" });
      }
      await MKGameMode.deleteOne({ _id: id });
      res.status(200).json({
        message: "Game mode deleted successfully",
        gameMode: gameMode,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
