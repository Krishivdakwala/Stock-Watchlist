const express = require("express");
const router = express.Router();
const Watchlist = require("../models/watchlist_model");

// route to create a watchlist
router.post("/create", async (req, res) => {
  const { userId, watchlistName } = req.body;
  try {
    const response = await Watchlist.create({
      userId: userId,
      name: watchlistName,
      stocks: [],
    });

    res.send({
      status: "ok",
      msg: "watchlist created",
      data: {
        userId: userId,
        watchlistName: watchlistName,
      },
    });

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

// route to fetch the watchlist
router.get("/get", async (req, res) => {
  const { userId, watchlistName } = req.body;
  try {
    const watchlist = await Watchlist.findOne({
      userId: userId,
      name: watchlistName,
    });

    res.send({
      status: "ok",
      msg: "watchlist fetched",
      data: {
        watchlist: watchlist,
      },
    });

    console.log("Watchlist Fetched : ", watchlist);
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

// route to fetch the watchlist
router.delete("/delete", async (req, res) => {
  const { userId, watchlistName } = req.body;
  try {
    const watchlist = await Watchlist.findOneAndDelete({
      userId: userId,
      name: watchlistName,
    });

    res.send({
      status: "ok",
      msg: "watchlist deleted",
    });

    console.log("Watchlist Deleted ");
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

// route to clear the watchlist
router.post("/clear", async (req, res) => {
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

    res.send({
      status: "ok",
      msg: "watchlist cleared",
      data: {
        userId: userId,
        watchlistName: watchlistName,
      },
    });

    console.log("Watchlist Cleared ");
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

//route to add stock to watchlist
router.post("/addStock", async (req, res) => {
  const { userId, watchlistName, stockId } = req.body;

  console.log(req.body);

  try {
    const response = await Watchlist.findOneAndUpdate(
      { $and: [{ userId: userId }, { name: watchlistName }] },
      {
        $addToSet: {
          stocks: stockId,
        },
      }
    );

    console.log(response);

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

      console.log("Stock Added ");
    } else {
      res.send({ status: "Some error" });
    }
  } catch (err) {
    res.send({ status: "err", msg: err });
  }
});

//route to remove stock from watchlist
router.post("/removeStock", async (req, res) => {
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

    res.send({
      status: "ok",
      msg: "stock removed from watchlist",
      data: {
        userId: userId,
        watchlistName: watchlistName,
        stockId: stockId,
      },
    });

    console.log("Stock Removed");
  } catch (err) {
    res.send({
      status: "err",
      msg: err,
    });
  }
});

module.exports = router;
