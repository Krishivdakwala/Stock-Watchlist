const express = require("express");
const router = express.Router();

const {
  createWatchlist,
  getWatchlists,
  clearWatchlist,
  deleteWatchlist,
  addStock,
  getStocks,
  removeStock,
} = require("../controllers/watchlistControllers");

router.route("/create").post(createWatchlist);
router.route("/view").get(getWatchlists);
router.route("/clear").post(clearWatchlist);
router.route("/delete").delete(deleteWatchlist);

router.route("/addStock").post(addStock);
router.route("/getStocks").get(getStocks);
router.route("/removeStock").delete(removeStock);

module.exports = router;
