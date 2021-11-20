const asyncHandler = require("express-async-handler");
const Watchlist = require("../models/watchlistModel");

const createWatchlist = asyncHandler(async (req, res) => {
  const { userId, watchlistName } = req.body;
  try {
    const response = await Watchlist.create({
      userId: userId,
      name: watchlistName,
      stocks: [],
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
    const watchlist = await Watchlist.findOne({
      userId: userId,
      name: watchlistName,
    });

    if (response) {
      res.send({
        status: "ok",
        msg: "watchlist fetched",
        data: {
          watchlist: watchlist,
        },
      });
    } else {
      res.send({ status: "rrror", msg: "error while fetching watchlists" });
    }

    console.log("Watchlist Fetched : ", watchlist);
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
      res.send({ status: "Error", msg: "error while removing stock" });
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
          stocks: stockId,
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

const getStocks = asyncHandler(async (req, res) => {
  const { userId, watchlistName } = req.body;

  try {
    res.send("opopopopopop");
  } catch (e) {
    res.send({
      status: "err",
      msg: err,
    });
  }
});

const removeStock = asyncHandler(async (req, res) => {
  const { userId, watchlistName, stockId } = req.body;

  try {
    const response = await Watchlist.findOneAndUpdate(
      { userId: userId, name: watchlistName },
      {
        $pull: {
          stocks: stockId,
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
  getStocks,
  removeStock,
};
