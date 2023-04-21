const express = require("express");
const router = express.Router();

// models
const MKCourse = require("../models/MKCourse");

// auth middleware
const checkHeader = require("../middleware/checkHeader");

router.get("/courses", async (req, res) => {
  try {
    const courses = await MKCourse.find().select("-__v");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await MKCourse.findById(id).select("-__v");
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/courses",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const { _id, name, cup, terrain, slipperiness, obstacles, character } =
        req.body;

      const newCourse = new MKCourse({
        _id,
        name,
        cup,
        terrain,
        slipperiness,
        obstacles,
        character,
      });

      const savedCourse = await newCourse.save();

      res.status(201).json({
        message: "Course created successfully",
        course: savedCourse,
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.put(
  "/courses/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { _id, name, cup, terrain, slipperiness, obstacles, character } =
        req.body;

      const updatedCourse = new MKCourse({
        _id,
        name,
        cup,
        terrain,
        slipperiness,
        obstacles,
        character,
      });

      if (name) {
        updatedCourse.image = `/images/${toFilename(name, false)}`;
      }

      const course = await MKCourse.findByIdAndUpdate(id, updatedCourse, {
        new: true,
      });
      if (!course) {
        return res.status(404).json({ error: "course not found" });
      }
      res.status(200).json({
        message: "Course updated successfully",
        course: course,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete(
  "/courses/:id",
  checkHeader("mk-token", process.env.TOKEN_ACCESS),
  async (req, res) => {
    try {
      const id = req.params.id;
      const course = await MKCourse.findById(id).select("-__v");
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      await MKCourse.deleteOne({ _id: id });
      res.status(200).json({
        message: "Course deleted successfully",
        course: course,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
