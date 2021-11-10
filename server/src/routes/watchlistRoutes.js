const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Watchlist is working Finally");
});

module.exports = router;
