const mongoose = require("mongoose");

const watchlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      unique: true,
    },
    stockIds: {
      type: Array,
      default: [],
    },
  },
  { collection: "watchlists" },
  {
    timestamps: true,
  }
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
