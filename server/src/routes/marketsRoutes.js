const express = require("express");
const Stock = require("../models/stockModel");
const { getStockData, searchStock } = require("../utils/stockAPI");
const router = express.Router();

router.get("/:stockId?", async (req, res) => {
  try {
    var stockData;

    stockData = await Stock.find();
    if (req.params.stockId) {
      stockData = await Stock.findById(req.params.stockId);
    }
    res.send({ data: stockData });
  } catch (e) {
    console.log(e);
  }
});

router.get("/find/:stock?", async (req, res) => {
  try {
    var stockData = await searchStock(req.params.stock.toString());
    res.send({ searchedFor: req.params.stock, matches: stockData });
  } catch (e) {
    console.log(e);
  }
});

router.get("/data/:set?", async (req, res) => {
  const stocks1 = ["RELIANCE", "TATAMOTORS", "TITAN", "ITC", "ADANIENT"];
  const stocks2 = ["HDFC", "SBIN", "KOTAKBANK", "AXISBANK", "ICICIBANK"];
  const stocks3 = ["TCS", "INFY", "HCLTECH", "TECHM"];
  const stocks4 = ["BHARTIARTL", "IDEA", "RCOM"];
  const stocks5 = ["SUNPHARMA", "DRREDDY", "BIOCON"];

  var stocks = [];
  switch (req.params.set) {
    case "1":
      stocks = stocks1;
      break;
    case "2":
      stocks = stocks2;
      break;
    case "3":
      stocks = stocks3;
      break;
    case "4":
      stocks = stocks4;
      break;
    case "5":
      stocks = stocks5;
      break;
    default:
      stocks = stocks1;
  }

  const stocksData = [];
  var response;

  for (var i in stocks) {
    var stockData;
    stockData = await getStockData(stocks[i].toString());
    // console.log(stockData["Meta Data"]);

    // fetch the market active dates
    const stockDates = [];
    var cnt = 0;
    for (var i in stockData["Time Series (Daily)"]) {
      if (cnt == 5) {
        break;
      } else {
        stockDates.push(i);
        cnt++;
      }
    }

    var stockPrices = [];
    // fetch data on market active dates
    for (var i in stockDates) {
      var currentData =
        stockData["Time Series (Daily)"][stockDates[i].toString()];

      const priceData = {
        date: stockDates[i].toString(),
        open: currentData["1. open"],
        high: currentData["2. high"],
        low: currentData["3. low"],
        close: currentData["4. close"],
        volume: currentData["6. volume"],
        dividend: currentData["7. dividend amount"],
      };

      stockPrices.push(priceData);
    }

    response = await Stock.findOneAndReplace(
      { stockName: stockData["Meta Data"]["2. Symbol"] },
      {
        stockName: stockData["Meta Data"]["2. Symbol"],
        refreshedOn: stockData["Meta Data"]["3. Last Refreshed"],
        stockPrices: stockPrices,
      },
      { upsert: true }
    );

    stocksData.push(response);
  }

  res.json(stocksData);
});

module.exports = router;
