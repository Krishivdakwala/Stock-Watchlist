const asyncHandler = require("express-async-handler");
const { watch } = require("../models/stockModel");
const Stock = require("../models/stockModel");
const Watchlist = require("../models/watchlistModel");

const createWatchlist = asyncHandler(async (req, res) => {
  const { userId, watchlistName } = req.body;
  try {
    const response = await Watchlist.create({
      userId: userId,
      name: watchlistName,
    });

    if (response) {
      res.send({
        status: "ok",
        msg: "watchlist created",
        data: {
          userId: userId,
          watchlistName: watchlistName,
        },
      });
    } else {
      res.send({ status: "error", msg: "error while creating watchlist" });
    }

    console.log("Watchlist Created : ", response);
  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        status: "error",
        error: "Watchlist name already in use",
      });
    }
    res.send({ status: "err", msg: err });
  }
});

const getWatchlists = asyncHandler(async (req, res) => {
  const { userId, watchlistName } = req.body;

  try {
    let watchlist;
    if (watchlistName != undefined) {
      watchlist = await Watchlist.findOne({
        userId: userId,
        name: watchlistName,
      });
    } else {
      watchlist = await Watchlist.find({
        userId: userId,
      });
    }

    if (watchlist) {
      var stocks = [];

      for (var i in watchlist.stockIds) {
        const data = await Stock.findById(watchlist.stockIds[i]);
        stocks.push(data);
      }

      res.send({
        status: "ok",
        msg: "watchlist fetched",
        data: {
          watchlist: watchlist,
          stocks: stocks,
        },
      });
    } else {
      res.send({ status: "error", msg: "error while fetching watchlists" });
    }
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

const clearWatchlist = asyncHandler(async (req, res) => {
  const { userId, watchlistName } = req.body;
  try {
    const response = await Watchlist.findOneAndUpdate(
      { userId: userId, name: watchlistName },
      {
        $set: {
          stockIds: [],
          stocks: [],
        },
      }
    );

    if (response) {
      res.send({
        status: "ok",
        msg: "watchlist cleared",
        data: {
          userId: userId,
          watchlistName: watchlistName,
        },
      });
      console.log("Watchlist Cleared ");
    } else {
      res.send({ status: "Error", msg: "error while clearing watchlist" });
    }
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

const deleteWatchlist = asyncHandler(async (req, res) => {
  const { userId, watchlistName } = req.body;
  try {
    const response = await Watchlist.findOneAndDelete({
      userId: userId,
      name: watchlistName,
    });

    if (response) {
      res.send({
        status: "ok",
        msg: "watchlist deleted",
      });

      console.log("Watchlist Deleted ");
    } else {
      res.send({ status: "Error", msg: "error while deleting stock" });
    }
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

const addStock = asyncHandler(async (req, res) => {
  const { userId, watchlistName, stockId } = req.body;
  try {
    const response = await Watchlist.findOneAndUpdate(
      { $and: [{ userId: userId }, { name: watchlistName }] },
      {
        $addToSet: {
          stockIds: stockId,
        },
      }
    );

    if (response) {
      res.send({
        status: "ok",
        msg: "stock added to watchlist",
        data: {
          userId: userId,
          watchlistName: watchlistName,
          stockId: stockId,
        },
      });
      console.log("Stock Added");
    } else {
      res.send({ status: "Error", msg: "error while adding stock" });
    }
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

const getStock = asyncHandler(async (stockId) => {
  // const { stockId } = req.body;

  try {
    const stockData = await Stock.findById(stockId);

    if (stockData) {
      console.log("Stocks Fetched");
      return stockData;
    } else {
      return "error while fetching stocks";
    }
  } catch (err) {
    console.log(err);
  }
});

const removeStock = asyncHandler(async (req, res) => {
  const { userId, watchlistName, stockId } = req.body;

  try {
    const response = await Watchlist.findOneAndUpdate(
      { userId: userId, name: watchlistName },
      {
        $pull: {
          stockIds: stockId,
        },
      }
    );

    if (response) {
      res.send({
        status: "ok",
        msg: "stock removed from watchlist",
        data: {
          userId: userId,
          watchlistName: watchlistName,
          stockId: stockId,
        },
      });
    } else {
      res.send({ status: "Error", msg: "error while removing stock" });
    }

    console.log("Stock Removed");
  } catch (err) {
    res.send({
      status: "err",
      msg: err,
    });
  }
});

module.exports = {
  createWatchlist,
  getWatchlists,
  clearWatchlist,
  deleteWatchlist,
  addStock,
  getStock,
  removeStock,
};
