const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
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
const categoriesRoutes = require("./routes/categories");
const charactersRoutes = require("./routes/characters");
const coursesRoutes = require("./routes/courses");
const cupsRoutes = require("./routes/cups");
const gameModesRoutes = require("./routes/gameModes");
const itemsRoutes = require("./routes/items");
const maximumSpeedsRoutes = require("./routes/maximumSpeeds");
const nonPlayablesRoutes = require("./routes/nonPlayables");
const rivalsRoutes = require("./routes/rivals");
app.use(
  "/api/",
  imagesRoutes,
  categoriesRoutes,
  charactersRoutes,
  coursesRoutes,
  cupsRoutes,
  gameModesRoutes,
  itemsRoutes,
  maximumSpeedsRoutes,
  nonPlayablesRoutes,
  rivalsRoutes
);

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
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
