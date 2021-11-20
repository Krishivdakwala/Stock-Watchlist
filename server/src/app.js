const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

const usersRoutes = require("./routes/usersRoutes");
const watchlistsRoutes = require("./routes/watchlistsRoutes");
const alertRoutes = require("./routes/alertRoutes");

app.use("/users", usersRoutes);
app.use("/watchlists", watchlistsRoutes);
app.use("/alert", alertRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
