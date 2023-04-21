const express = require("express");
const router = express.Router();

// models
const MKCategory = require("../models/MKCategory");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/categories", async (req, res) => {
  try {
    const categories = await MKCategory.find().select("-__v");
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await MKCategory.findById(id).select("-__v");
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/categories",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const { _id, speed } = req.body;

      const newCategory = new MKCategory({
        _id,
        speed,
      });

      const savedCategory = await newCategory.save();

      res.status(201).json({
        message: "Category created successfully",
        category: savedCategory,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, speed } = req.body;

    const updatedCategory = new MKCategory({
      _id,
      speed,
    });

    const category = await MKCategory.findByIdAndUpdate(id, updatedCategory, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category updated successfully", item: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await MKCategory.findById(id).select("-__v");
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await MKCategory.deleteOne({ _id: id });
    res.status(200).json({
      message: "Category deleted successfully",
      category: category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
