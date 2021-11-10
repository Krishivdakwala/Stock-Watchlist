const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

app.use("/user", userRoutes);
app.use("/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

module.exports = app;