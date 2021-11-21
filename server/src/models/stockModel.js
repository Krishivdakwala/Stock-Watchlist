const mongoose = require("mongoose");

const stockSchema = mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
      unique: true,
    },
    stockPrices: {
      type: Array,
      required: true,
    },
    refreshedOn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
