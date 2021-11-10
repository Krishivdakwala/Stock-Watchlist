const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    stocks: {
      type: Array,
      default: [],
    },
  },
  { collection: "watchlists" }
);

const Watchlist = mongoose.model("WatchlistSchema", watchlistSchema);

module.exports = Watchlist;
