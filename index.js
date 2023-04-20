const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

// routes
const charactersRoutes = require("./routes/characters");
app.use("/api/", charactersRoutes);

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
