const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const alertRoutes = require("./routes/alertRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use("/user", userRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/alert", alertRoutes);

app.use("/users", usersRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Working");
});

module.exports = app;
