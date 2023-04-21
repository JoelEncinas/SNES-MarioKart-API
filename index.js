const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const limiter = require("./middleware/rateLimiter");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());
// app.use(limiter);

// serve images
app.use(express.static("public"));

// routes
const imagesRoutes = require("./routes/images");
const charactersRoutes = require("./routes/characters");
const itemsRoutes = require("./routes/items");
const nonPlayableRoutes = require("./routes/nonPlayable");
app.use("/api/", imagesRoutes);
app.use("/api/", charactersRoutes);
app.use("/api/", itemsRoutes);
app.use("/api/", nonPlayableRoutes);

// mongodb
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pug2uxj.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

// start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
