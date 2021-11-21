const express = require("express");

const { getNews } = require("../utils/newsAPI");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getNews();
  res.send(data);
});

module.exports = router;
