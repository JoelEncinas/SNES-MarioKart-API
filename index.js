const express = require("express");
const app = express();

const charactersRoutes = require("./routes/characters");

app.use("/api/characters", charactersRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
