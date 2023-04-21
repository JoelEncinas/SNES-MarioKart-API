const express = require("express");
const router = express.Router();
const path = require("path"); 

router.get("/images/:filename", (req, res) => {
    const { filename } = req.params;
    const imagePath = path.resolve(__dirname, "../public/images", filename);
    res.sendFile(imagePath);
  });
module.exports = router;
