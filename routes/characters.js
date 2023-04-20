const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "success", data: user });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).send(`Details for user with id ${id}`);
});

module.exports = router;
