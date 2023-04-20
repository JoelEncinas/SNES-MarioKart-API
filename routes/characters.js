const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "success", data: user });
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  res.status(200).send(`Details for user with id ${name}`);
});

module.exports = router;
